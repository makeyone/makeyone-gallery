export type EditPostStep =
  | 'title'
  | 'image'
  | 'housing'
  | 'switch'
  | 'keycap'
  | 'stabilizer'
  | 'keyboard-layout'
  | 'keycap-on-layout'
  | 'switch-on-layout'
  | 'stabilizer-on-layout'
  | 'pcb'
  | 'plate'
  | 'video'
  | 'content'
  | 'setting';
export const stepList: EditPostStep[] = [
  'title',
  'image',
  'housing',
  'switch',
  'keycap',
  'stabilizer',
  'keyboard-layout',
  'keycap-on-layout',
  'switch-on-layout',
  'stabilizer-on-layout',
  'pcb',
  'plate',
  'video',
  'content',
  'setting',
];
