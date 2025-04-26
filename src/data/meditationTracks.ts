
export interface MeditationTrack {
  id: string;
  title: string;
  url: string;
  type: 'default' | 'creative' | 'stress-relief' | 'custom';
}

export const defaultTracks: MeditationTrack[] = [
  {
    id: 'peaceful-meditation',
    title: 'Peaceful Meditation',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
    type: 'default'
  },
  {
    id: 'gentle-rain',
    title: 'Gentle Rain',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c9a4a1c23b.mp3',
    type: 'stress-relief'
  },
  {
    id: 'nature-sounds',
    title: 'Nature Sounds',
    url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0fd6a8101.mp3',
    type: 'stress-relief'
  },
  {
    id: 'creative-flow',
    title: 'Creative Flow',
    url: 'https://cdn.pixabay.com/download/audio/2023/06/08/audio_8a366bca46.mp3',
    type: 'creative'
  },
  {
    id: 'focus-beats',
    title: 'Focus Beats',
    url: 'https://cdn.pixabay.com/download/audio/2023/02/28/audio_946b4dad21.mp3',
    type: 'creative'
  }
];
