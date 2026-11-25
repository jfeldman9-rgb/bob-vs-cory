import json,subprocess,numpy as np,os,collections,wave
exec(open('spec.py').read())
spec={s[0]:s for s in S}
q=json.load(open('qa.json'))
G='/workspace/bob-cory-mk/game/public/assets/audio'
REJECT={'misc_timer_tick__1','misc_timer_tick__2','ui_hover__1','ui_hover__3'}
PICK={'sting_versus':['1'],'sting_fatality_bob':['1'],'sting_fatality_cory':['1'],'sting_finish_drone':['2'],
      'sting_game_over':['2'],'sting_victory_bob':['1'],'sting_victory_cory':['2']}
def dec(f,ch):
    out=subprocess.run(['ffmpeg','-v','error','-i',f,'-f','f32le','-ac',str(ch),'-ar','44100','-'],capture_output=True).stdout
    return np.frombuffer(out,dtype=np.float32).reshape(-1,ch).copy()
def wav(path,x):
    x=np.clip(x,-1,1); i=(x*32767).round().astype('<i2')
    with wave.open(path,'wb') as w:
        w.setnchannels(x.shape[1]); w.setsampwidth(2); w.setframerate(44100); w.writeframes(i.tobytes())
def trim(x, lead_db=-45, tail_db=-60):
    m=np.abs(x).max(axis=1)
    on=np.where(m>10**(lead_db/20))[0]
    if len(on)==0: return x
    a=max(0,on[0]-int(0.004*44100))
    on2=np.where(m>10**(tail_db/20))[0]; b=min(len(x),on2[-1]+int(0.03*44100))
    y=x[a:b].copy(); f=min(len(y)//4,int(0.03*44100))
    if f>0: y[-f:]*=np.linspace(1,0,f)[:,None]
    return y
by=collections.defaultdict(list)
for k in sorted(q):
    sid,n=k[:-4].split('__')
    if k[:-4] in REJECT: continue
    by[sid].append(n)
manifest={}; os.makedirs(G+'/sfx',exist_ok=True); os.makedirs(G+'/ambience',exist_ok=True); os.makedirs(G+'/stings',exist_ok=True)
for sid,ns in by.items():
    s=spec[sid]; want=s[1]
    if sid in PICK: ns=PICK[sid]
    elif len(ns)>want:  # extra takes from a redo: keep the loudest `want`
        ns=sorted(ns,key=lambda n:-q[f'{sid}__{n}.mp3']['rms_db'])[:want]
    files=[]
    for j,n in enumerate(sorted(ns,key=int)):
        src=f'raw/{sid}__{n}.mp3'
        if sid.startswith('amb_') or sid=='misc_dizzy' or sid=='sting_finish_drone':
            sub='ambience' if sid.startswith('amb_') else ('stings' if sid.startswith('sting') else 'sfx')
            x=dec(src,2)                      # loop: untouched samples, lossless container for gapless looping
            out=f'{sub}/{sid}.wav'; wav(f'{G}/{out}',x)
        elif sid.startswith('sting_'):
            x=dec(src,2); y=trim(x,-50,-55); y*=10**(-1/20)/np.abs(y).max()
            out=f'stings/{sid}.wav'; wav(f'{G}/{out}',y)
        else:
            x=dec(src,1); y=trim(x); y*=10**(-1/20)/np.abs(y).max()
            out=f'sfx/{sid}_{j+1}.wav'; wav(f'{G}/{out}',y)
        files.append(out)
    manifest[sid]=dict(files=files,loop=bool(s[3]),durationTarget=s[2])
json.dump(manifest,open('/workspace/bob-cory-mk/game/src/data/sfx-manifest.json','w'),indent=1)
cnt=collections.Counter('amb' if k.startswith('amb_') else 'sting' if k.startswith('sting') else 'sfx' for k,v in manifest.items() for f in v['files'])
print(cnt, sum(len(v['files']) for v in manifest.values()))
