import wave, struct, math

sample_rate = 44100
duration = 30.0
total_samples = int(sample_rate * duration)

with wave.open("/home/vallencia/Projects/remotion-replayfx/public/promo_audio.wav", "w") as wav:
    wav.setnchannels(2)
    wav.setsampwidth(2)
    wav.setframerate(sample_rate)
    buf = bytearray()
    
    # Scene cut times for impacts: 0, 3.0, 6.5, 10.5, 14.5, 18.5, 22.0, 26.0
    impact_times = [0.0, 3.0, 6.5, 10.5, 14.5, 18.5, 22.0, 26.0]
    
    for i in range(total_samples):
        t = i / sample_rate
        
        # 1. Driving Synth Bass (120 BPM = beat every 0.5s)
        bt = t % 0.5
        # Pitch bending punchy sub kick
        kick_freq = 110 * math.exp(-bt * 22) + 45
        kick = math.sin(2 * math.pi * kick_freq * bt) * math.exp(-bt * 14) * 0.35
        
        # 2. Tech 16th-note Hi-hats
        ht = t % 0.125
        hihat = (math.sin(2 * math.pi * 5000 * ht) + math.sin(2 * math.pi * 8500 * ht)) * math.exp(-ht * 60) * 0.06
        
        # 3. Driving Cyber Bassline (rolling 8th notes)
        bass_note = 55 if (int(t * 2) % 4 != 3) else 65.4
        bass = math.sin(2 * math.pi * bass_note * t) * 0.16
        
        # 4. Impact Booms at scene cuts
        impact = 0.0
        for it in impact_times:
            if it <= t <= it + 1.5:
                dt = t - it
                boom = math.sin(2 * math.pi * (80 - dt * 35) * dt) * math.exp(-dt * 4.0) * 0.45
                noise_layer = math.sin(2 * math.pi * 1200 * dt) * math.exp(-dt * 15) * 0.15
                impact += (boom + noise_layer)
                
        # 5. Risers before impacts
        riser = 0.0
        for it in impact_times[1:]:
            if it - 0.8 <= t <= it:
                rt = (t - (it - 0.8)) / 0.8
                r_freq = 150 + 1200 * (rt ** 2)
                riser += math.sin(2 * math.pi * r_freq * (t - (it - 0.8))) * 0.18 * rt
                
        # Fade out
        fade = 1.0
        if t > 28.5:
            fade = max(0.0, (30.0 - t) / 1.5)
            
        sample = (kick + hihat + bass + impact + riser) * fade * 32767
        sample = max(-32767, min(32767, int(sample)))
        buf.extend(struct.pack('<hh', sample, int(sample * 0.95)))
        
        if len(buf) > 65536:
            wav.writeframes(buf)
            buf.clear()
            
    if buf:
        wav.writeframes(buf)

print("Hype cinematic promo audio generated!")
