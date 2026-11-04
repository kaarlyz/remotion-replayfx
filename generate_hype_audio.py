import wave, struct, math

sample_rate = 44100
duration = 30.0
total_samples = int(sample_rate * duration)

with wave.open("/home/vallencia/Projects/remotion-replayfx/public/hype_audio.wav", "w") as wav:
    wav.setnchannels(2)
    wav.setsampwidth(2)
    wav.setframerate(sample_rate)
    buf = bytearray()
    
    # Drop timestamps in seconds
    drops = [0.0, 3.5, 7.0, 11.0, 15.0, 19.0, 24.0]
    
    for i in range(total_samples):
        t = i / sample_rate
        
        # 1. Rolling 16th-note electro pulse (130 BPM -> beat = 0.4615s, 16th = 0.115s)
        beat_len = 60.0 / 130.0
        sixteenth = beat_len / 4.0
        
        st = t % sixteenth
        synth_zap = (math.sin(2 * math.pi * 3200 * st) + math.sin(2 * math.pi * 6400 * st)) * math.exp(-st * 70) * 0.04
        
        # 2. Heavy Sub Bass 808 Kick on every beat
        bt = t % beat_len
        # Pitch drop 120Hz -> 42Hz
        f_kick = 42 + 80 * math.exp(-bt * 25)
        kick = math.sin(2 * math.pi * f_kick * bt) * math.exp(-bt * 8) * 0.42
        
        # 3. Driving Synth Bassline (acid rhythm)
        acid_note = 55.0 if int(t / beat_len) % 4 != 3 else 65.4
        acid = math.sin(2 * math.pi * acid_note * t) * 0.18 * (0.6 + 0.4 * math.sin(2 * math.pi * (130/60) * 2 * t))
        
        # 4. Cinematic Braam / Sub Drop impacts at drops
        braam = 0.0
        for dt in drops:
            if dt <= t <= dt + 2.0:
                elapsed = t - dt
                # Giant brassy sub drop 55Hz with rich harmonics
                b_wave = (math.sin(2 * math.pi * 50 * elapsed) * 0.5 + 
                          math.sin(2 * math.pi * 100 * elapsed) * 0.3 + 
                          math.sin(2 * math.pi * 150 * elapsed) * 0.15)
                braam += b_wave * math.exp(-elapsed * 2.2) * 0.65
                
        # 5. Rising tension risers before each drop
        riser = 0.0
        for dt in drops[1:]:
            if dt - 1.2 <= t <= dt:
                rt = (t - (dt - 1.2)) / 1.2
                rfreq = 100 + 2200 * (rt ** 2.5)
                riser += math.sin(2 * math.pi * rfreq * (t - (dt - 1.2))) * 0.22 * rt
                
        # 6. Climax outro (t >= 24.0): sweeping celestial chime + slow sub decay
        outro = 0.0
        if t >= 24.0:
            ot = t - 24.0
            outro = (math.sin(2 * math.pi * 587.33 * ot) * 0.1 + 
                     math.sin(2 * math.pi * 880.00 * ot) * 0.08 + 
                     math.sin(2 * math.pi * 1174.66 * ot) * 0.05) * math.exp(-ot * 0.6)
            
        fade = 1.0
        if t > 28.8:
            fade = max(0.0, (30.0 - t) / 1.2)
            
        val = (kick + synth_zap + acid + braam + riser + outro) * fade * 32767
        val = max(-32767, min(32767, int(val)))
        buf.extend(struct.pack('<hh', val, int(val * 0.96)))
        
        if len(buf) > 65536:
            wav.writeframes(buf)
            buf.clear()
            
    if buf:
        wav.writeframes(buf)

print("Hype trailer audio generated with 808 subs & risers!")
