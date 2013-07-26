    // Song data
    var song = {
      // Song length in seconds (how much data to generate)
      songLen: 15,  // Tune this to fit your needs!

      songData: [
        { // Instrument 0
          // Oscillator 1
          osc1_oct: 8,
          osc1_det: 0,
          osc1_detune: 11,
          osc1_xenv: 0,
          osc1_vol: 192,
          osc1_waveform: 1,
          // Oscillator 2
          osc2_oct: 8,
          osc2_det: 7,
          osc2_detune: 13,
          osc2_xenv: 0,
          osc2_vol: 192,
          osc2_waveform: 1,
          // Noise oscillator
          noise_fader: 29,
          // Envelope
          env_attack: 0,
          env_sustain: 3997,
          env_release: 21759,
          env_master: 127,
          // Effects
          fx_filter: 2,
          fx_freq: 4137,
          fx_resonance: 53,
          fx_delay_time: 6,
          fx_delay_amt: 9,
          fx_pan_freq: 2,
          fx_pan_amt: 77,
          // LFO
          lfo_osc1_freq: 0,
          lfo_fx_freq: 0,
          lfo_freq: 6,
          lfo_amt: 88,
          lfo_waveform: 3,
    // Patterns 
	p: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 0, 0, 0, 0, 0, 0],
	// Columns
	c: [{'n': [132, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 132, 0, 0, 0, 151, 0, 0, 0, 149, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 149, 0, 0, 0, 147, 0, 0, 0, 134, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 134, 0, 0, 0, 147, 0, 0, 0, 134, 0, 0, 0, 132, 0, 0, 0, 142, 0, 0, 0, 0, 0, 0, 0, 132, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 139, 0, 0, 0, 0, 0, 142, 0, 0, 0, 0]},
		{'n': [132, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 132, 0, 0, 0, 151, 0, 0, 0, 149, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 149, 0, 0, 0, 152, 0, 0, 0, 151, 152, 0, 0]},
		{'n': [0, 0, 0, 0, 152, 0, 0, 0, 149, 0, 0, 0, 152, 0, 0, 0, 152, 153, 154, 0, 155, 0, 0, 0, 0, 0, 0, 0, 144, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
		{'n': [140, 0, 0, 0, 0, 0, 0, 0, 137, 0, 0, 0, 132, 0, 0, 0, 0, 0, 0, 0, 140, 0, 0, 0, 0, 0, 0, 0, 149, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 132, 0, 0, 0, 0, 0, 0, 0, 140, 0, 0, 0, 0, 0, 0, 0, 143, 132, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
		]
		},
        { // Instrument 1
          // Oscillator 1
          osc1_oct: 8,
          osc1_det: 0,
          osc1_detune: 0,
          osc1_xenv: 0,
          osc1_vol: 228,
          osc1_waveform: 1,
          // Oscillator 2
          osc2_oct: 9,
          osc2_det: 0,
          osc2_detune: 0,
          osc2_xenv: 0,
          osc2_vol: 227,
          osc2_waveform: 2,
          // Noise oscillator
          noise_fader: 0,
          // Envelope
          env_attack: 5,
          env_sustain: 927,
          env_release: 9216,
          env_master: 127,
          // Effects
          fx_filter: 3,
          fx_freq: 2340,
          fx_resonance: 73,
          fx_delay_time: 2,
          fx_delay_amt: 0,
          fx_pan_freq: 4,
          fx_pan_amt: 188,
          // LFO
          lfo_osc1_freq: 0,
          lfo_fx_freq: 1,
          lfo_freq: 8,
          lfo_amt: 0,
          lfo_waveform: 1,
    	// Patterns
		p: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    	// Columns
		c: [
		{'n': [123, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 108, 0, 0, 0, 118, 0, 0, 0, 108, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 110, 0, 0, 0, 123, 0, 0, 0, 125, 0, 0, 0, 123, 0, 0, 0, 125, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 125, 0, 0, 0, 127, 0, 0, 0, 125, 0, 0, 0, 123, 0, 0, 0, 125, 0, 0, 0, 0, 0, 0, 0, 123, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 108, 0, 0, 0, 0, 0, 110, 0, 0, 0, 0]},
		{'n': [123, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 108, 0, 0, 0, 118, 0, 0, 0, 108, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 125, 0, 0, 0, 123, 0, 0, 0, 125, 0, 0, 0, 123, 0, 0, 0, 110, 0, 0, 0]},
		{'n': [108, 0, 0, 0, 123, 0, 0, 0, 110, 0, 0, 0, 123, 0, 0, 0, 125, 0, 0, 0, 127, 0, 0, 0, 0, 0, 0, 0, 108, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
          ]
        },
        { // Instrument 2
          // Oscillator 1
          osc1_oct: 5,
          osc1_det: 0,
          osc1_detune: 0,
          osc1_xenv: 0,
          osc1_vol: 155,
          osc1_waveform: 1,
          // Oscillator 2
          osc2_oct: 6,
          osc2_det: 0,
          osc2_detune: 16,
          osc2_xenv: 1,
          osc2_vol: 136,
          osc2_waveform: 0,
          // Noise oscillator
          noise_fader: 0,
          // Envelope
          env_attack: 0,
          env_sustain: 1234,
          env_release: 3426,
          env_master: 132,
          // Effects
          fx_filter: 2,
          fx_freq: 1397,
          fx_resonance: 84,
          fx_delay_time: 0,
          fx_delay_amt: 0,
          fx_pan_freq: 0,
          fx_pan_amt: 0,
          // LFO
          lfo_osc1_freq: 0,
          lfo_fx_freq: 0,
          lfo_freq: 6,
          lfo_amt: 195,
          lfo_waveform: 0,
          // Patterns
		p: [1, 2, 3, 4, 1, 2, 1, 2, 1, 2, 5, 6, 7, 8, 9, 10],
          // Columns
		c: [
		{'n': [132, 0, 0, 0, 132, 0, 132, 0, 132, 0, 0, 0, 132, 0, 132, 0, 132, 0, 0, 0, 132, 0, 132, 0, 132, 0, 0, 0, 132, 0, 132, 0]},
		{'n': [142, 0, 0, 0, 142, 0, 142, 0, 142, 0, 0, 0, 142, 0, 142, 0, 142, 0, 0, 0, 142, 0, 142, 0, 142, 0, 0, 0, 142, 0, 142, 0]},
		{'n': [134, 0, 0, 0, 134, 0, 134, 0, 134, 0, 0, 0, 134, 0, 134, 0, 134, 0, 0, 0, 134, 0, 134, 0, 134, 0, 0, 0, 134, 0, 134, 0]},
		{'n': [132, 0, 0, 0, 132, 0, 132, 0, 132, 0, 0, 0, 132, 0, 132, 0, 161, 0, 161, 0, 161, 0, 161, 0, 154, 0, 154, 0, 154, 0, 154, 0]},
		{'n': [134, 0, 0, 0, 134, 0, 134, 0, 134, 0, 0, 0, 134, 0, 134, 0, 134, 0, 0, 0, 134, 0, 134, 0, 134, 0, 0, 0, 147, 0, 0, 0]},
		{'n': [132, 0, 132, 0, 132, 0, 132, 0, 147, 0, 147, 0, 132, 0, 147, 0, 149, 0, 149, 0, 147, 0, 149, 150, 151, 0, 151, 0, 154, 0, 151, 0]},
		{'n': [144, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
          ]
        },
        { // Instrument 3
          // Oscillator 1
          osc1_oct: 7,
          osc1_det: 0,
          osc1_detune: 0,
          osc1_xenv: 1,
          osc1_vol: 146,
          osc1_waveform: 0,
          // Oscillator 2
          osc2_oct: 8,
          osc2_det: 0,
          osc2_detune: 0,
          osc2_xenv: 1,
          osc2_vol: 152,
          osc2_waveform: 0,
          // Noise oscillator
          noise_fader: 226,
          // Envelope
          env_attack: 0,
          env_sustain: 1075,
          env_release: 6338,
          env_master: 192,
          // Effects
          fx_filter: 3,
          fx_freq: 4498,
          fx_resonance: 195,
          fx_delay_time: 6,
          fx_delay_amt: 0,
          fx_pan_freq: 5,
          fx_pan_amt: 0,
          // LFO
          lfo_osc1_freq: 0,
          lfo_fx_freq: 1,
          lfo_freq: 4,
          lfo_amt: 63,
          lfo_waveform: 3,
        // Patterns
		p: [1, 2, 1, 1, 1, 3, 4, 5],
		c: [
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 104, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 104, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 104, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 104, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 104, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 104, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 104, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 0, 0, 0, 0, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
		{'n': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
          ]
        },
        { // Instrument 4
          // Oscillator 1
	  osc1_oct: 7,
          osc1_det: 0,
          osc1_detune: 0,
          osc1_xenv: 0,
          osc1_vol: 192,
	  osc1_waveform: 3,
          // Oscillator 2
	  osc2_oct: 6,
          osc2_det: 0,
	  osc2_detune: 9,
          osc2_xenv: 0,
	  osc2_vol: 192,
	  osc2_waveform: 1,
          // Noise oscillator
	  noise_fader: 52,
          // Envelope
	  env_attack: 1776,
	  env_sustain: 19084,
	  env_release: 5614,
          env_master: 192,
          // Effects
	  fx_filter: 3,
	  fx_freq: 982,
	  fx_resonance: 89,
	  fx_delay_time: 6,
	  fx_delay_amt: 25,
	  fx_pan_freq: 6,
	  fx_pan_amt: 77,
          // LFO
          lfo_osc1_freq: 0,
	  lfo_fx_freq: 1,
	  lfo_freq: 2,
	  lfo_amt: 79,
	  lfo_waveform: 2,
          // Patterns
          p: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          // Columns
          c: [
	    {n: [154,0,156,0,158,0,161,0,154,0,156,0,158,0,161,0,154,0,156,0,158,0,161,0,154,0,156,0,158,0,161,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}
          ]
        },
        { // Instrument 5
          // Oscillator 1
	  osc1_oct: 7,
          osc1_det: 0,
          osc1_detune: 0,
          osc1_xenv: 0,
          osc1_vol: 192,
          osc1_waveform: 0,
          // Oscillator 2
	  osc2_oct: 7,
          osc2_det: 0,
          osc2_detune: 0,
          osc2_xenv: 0,
	  osc2_vol: 192,
          osc2_waveform: 0,
          // Noise oscillator
          noise_fader: 0,
          // Envelope
	  env_attack: 200,
	  env_sustain: 2000,
	  env_release: 20000,
          env_master: 192,
          // Effects
          fx_filter: 0,
	  fx_freq: 11025,
	  fx_resonance: 255,
          fx_delay_time: 0,
          fx_delay_amt: 0,
          fx_pan_freq: 0,
          fx_pan_amt: 0,
          // LFO
          lfo_osc1_freq: 0,
          lfo_fx_freq: 0,
          lfo_freq: 0,
          lfo_amt: 0,
          lfo_waveform: 0,
          // Patterns
          p: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          // Columns
          c: [
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}
          ]
        },
        { // Instrument 6
          // Oscillator 1
	  osc1_oct: 7,
          osc1_det: 0,
          osc1_detune: 0,
          osc1_xenv: 0,
          osc1_vol: 192,
          osc1_waveform: 0,
          // Oscillator 2
	  osc2_oct: 7,
          osc2_det: 0,
          osc2_detune: 0,
          osc2_xenv: 0,
	  osc2_vol: 192,
          osc2_waveform: 0,
          // Noise oscillator
          noise_fader: 0,
          // Envelope
	  env_attack: 200,
	  env_sustain: 2000,
	  env_release: 20000,
          env_master: 192,
          // Effects
          fx_filter: 0,
	  fx_freq: 11025,
	  fx_resonance: 255,
          fx_delay_time: 0,
          fx_delay_amt: 0,
          fx_pan_freq: 0,
          fx_pan_amt: 0,
          // LFO
          lfo_osc1_freq: 0,
          lfo_fx_freq: 0,
          lfo_freq: 0,
          lfo_amt: 0,
          lfo_waveform: 0,
          // Patterns
          p: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          // Columns
          c: [
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}
          ]
        },
        { // Instrument 7
          // Oscillator 1
	  osc1_oct: 7,
          osc1_det: 0,
          osc1_detune: 0,
          osc1_xenv: 0,
          osc1_vol: 192,
          osc1_waveform: 0,
          // Oscillator 2
	  osc2_oct: 7,
          osc2_det: 0,
          osc2_detune: 0,
          osc2_xenv: 0,
	  osc2_vol: 192,
          osc2_waveform: 0,
          // Noise oscillator
          noise_fader: 0,
          // Envelope
	  env_attack: 200,
	  env_sustain: 2000,
	  env_release: 20000,
          env_master: 192,
          // Effects
          fx_filter: 0,
	  fx_freq: 11025,
	  fx_resonance: 255,
          fx_delay_time: 0,
          fx_delay_amt: 0,
          fx_pan_freq: 0,
          fx_pan_amt: 0,
          // LFO
          lfo_osc1_freq: 0,
          lfo_fx_freq: 0,
          lfo_freq: 0,
          lfo_amt: 0,
          lfo_waveform: 0,
          // Patterns
          p: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          // Columns
          c: [
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            {n: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}
          ]
        }
      ],
      rowLen: 2067,   // In sample lengths
      endPattern: 9,  // End pattern
    };
