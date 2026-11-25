import json,subprocess,numpy as np,sys,glob,os
exec(open('spec.py').read())
spec={s[0]:s for s in S}
def decode(f):
    out=subprocess.run(['ffmpeg','-v','error','-i',f,'-f','f32le','-ac','2','-ar','44100','-'],capture_output=True).stdout
    return np.frombuffer(out,dtype=np.float32).reshape(-1,2)
def qa(f):
    x=decode(f); m=np.abs(x).max(axis=1); sr=44100
    dur=len(x)/sr; peak=float(m.max()) if len(m) else 0
    rms=float(np.sqrt((x**2).mean())) if len(x) else 0
    clip=int((m>=0.999).sum())
    win=int(0.05*sr); nw=max(1,len(m)//win)
    wr=np.array([np.sqrt((x[i*win:(i+1)*win]**2).mean()) for i in range(nw)])
    silent=float((wr<10**(-60/20)).mean())
    lead=next((i for i,v in enumerate(m) if v>0.01),len(m))/sr
    return dict(dur=round(dur,2),peak_db=round(20*np.log10(peak+1e-9),1),rms_db=round(20*np.log10(rms+1e-9),1),clip=clip,silent=round(silent,2),lead=round(lead,3))
res={}
for f in sorted(glob.glob(sys.argv[1] if len(sys.argv)>1 else 'raw/*.mp3')):
    sid=os.path.basename(f).split('__')[0]; r=qa(f); s=spec[sid]
    bad=[]
    if r['peak_db']<-30 or r['rms_db']<-45: bad.append('quiet')
    if r['clip']>20: bad.append('clip')
    if abs(r['dur']-s[2])>max(0.25,0.1*s[2]): bad.append('len')
    if r['silent']>0.5: bad.append('silent')
    if r['lead']>0.15 and s[2]<5: bad.append('lead')
    r['bad']=bad; res[os.path.basename(f)]=r
json.dump(res,open('qa.json','w'),indent=1)
for k,r in res.items(): print(k,r)
