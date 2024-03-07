export type EditPostStep =
  | 'title'
  | 'image'
  | 'housing'
  | 'switch'
  | 'keycap'
  | 'stabilizer'
  | 'keyboard-definition'
  | 'switch-on-layout'
  | 'keycap-on-layout'
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
  'keycap-on-layout',
  'keyboard-definition',
  'switch-on-layout',
  'stabilizer-on-layout',
  'pcb',
  'plate',
  'video',
  'content',
  'setting',
];
