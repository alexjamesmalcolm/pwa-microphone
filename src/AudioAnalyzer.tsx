import React, { Component } from "react";
import { AudioVisualizer } from "./AudioVisualizer";

export class AudioAnalyzer extends Component<
  { audio: MediaStream },
  { audioData: Uint8Array }
> {
  audioContext: AudioContext | undefined;
  analyser: any;
  dataArray: Uint8Array | undefined;
  source: any;
  rafId!: number;
  constructor(
    props: { audio: MediaStream } | Readonly<{ audio: MediaStream }>
  ) {
    super(props);
    this.state = { audioData: new Uint8Array(0) };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.audioContext = new window.AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.source = this.audioContext.createMediaStreamSource(this.props.audio);
    this.source.connect(this.analyser);
    this.rafId = requestAnimationFrame(this.tick);
  }

  tick() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    if (this.dataArray) {
      this.setState({ audioData: this.dataArray });
    }
    this.rafId = requestAnimationFrame(this.tick);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    this.analyser.disconnect();
    this.source.disconnect();
  }

  render() {
    return <AudioVisualizer audioData={this.state.audioData} />;
    // return <textarea value={this.state.audioData.toString()} />;
  }
}

export default AudioAnalyzer;
