export type EditPostStep =
  | 'title'
  | 'image'
  | 'housing'
  | 'pcb'
  | 'plate'
  | 'foam'
  | 'switch'
  | 'keycap'
  | 'stabilizer'
  | 'keyboard-definition'
  | 'switch-on-layout'
  | 'keycap-on-layout'
  | 'video'
  | 'content'
  | 'setting';
export const stepList: EditPostStep[] = [
  'title',
  'image',
  'housing',
  'pcb',
  'plate',
  'foam',
  'switch',
  'keycap',
  'stabilizer',
  'keyboard-definition',
  'switch-on-layout',
  'keycap-on-layout',
  'video',
  'content',
  'setting',
];
