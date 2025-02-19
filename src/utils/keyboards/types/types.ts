import { KeyboardKeycapProfileUnion } from '@/constants/enum/KeyboardKeycapProfile.enum';
import { KeyboardKeycapTextureUnion } from '@/constants/enum/KeyboardKeycapTexture.enum';
import { KeyboardSwitchLubeUnion } from '@/constants/enum/KeyboardSwitchLube.enum';
import { KeyboardSwitchTypeUnion } from '@/constants/enum/KeyboardSwitchType.enum';

import type {
  DefinitionVersion,
  KeyboardDefinitionIndex,
  KeyboardDictionary,
  LightingValue,
  VIADefinitionV2,
  VIADefinitionV3,
  VIAKey,
  VIAMenu,
} from '@the-via/reader';

export type Switch = {
  id: number;
  switchName: string;
  switchType: KeyboardSwitchTypeUnion;
  isSlientSwitch: boolean;
  switchLube: KeyboardSwitchLubeUnion;
  bottomOutForce: number | null;
  springLength: number | null;
  switchFilm: string | null;
  remark: string | null;
};

export type Keycap = {
  id: number;
  keycapName: string;
  keycapProfile: KeyboardKeycapProfileUnion;
  keycapTexture: KeyboardKeycapTextureUnion;
  manufacturer: string | null;
  remark: string | null;
};

export type KeyboardLayoutKey = VIAKey & {
  registeredSwitch?: Pick<Switch, 'id' | 'switchName'>;
  registeredKeycap?: Pick<Keycap, 'id' | 'keycapName'>;
};

export type KeyboardLayoutOptionKey = {
  [g: string]: {
    [o: string]: (VIAKey & {
      registeredSwitch?: Pick<Switch, 'id' | 'switchName'>;
      registeredKeycap?: Pick<Keycap, 'id' | 'keycapName'>;
    })[];
  };
};

export type KeyboardDefinition = (VIADefinitionV2 | VIADefinitionV3) & {
  layouts: {
    keys: KeyboardLayoutKey[];
    optionKeys: KeyboardLayoutOptionKey;
  };
};

export enum TestKeyState {
  Initial,
  KeyDown,
  KeyUp,
}

export enum TestKeyboardSoundsMode {
  Random,
  WickiHayden,
  Chromatic,
}

export type HIDColor = {
  hue: number;
  sat: number;
};

export type LightingData = Partial<{ [key in LightingValue]: number[] }> & {
  customColors?: HIDColor[];
};

export type DeviceInfo = {
  vendorId: number;
  productId: number;
  productName: string;
  protocol?: number;
};

export type Device = DeviceInfo & {
  path: string;
  productName: string;
  interface: number;
};

export type Keymap = number[];
export type Layer = {
  keymap: Keymap;
  isLoaded: boolean;
};

export type DeviceLayerMap = { [devicePath: string]: Layer[] };

export type WebVIADevice = Device & {
  _device: HIDDevice;
};

// Refers to a device that may or may not have an associated definition but does have a valid protocol version
export type AuthorizedDevice = DeviceInfo & {
  path: string;
  vendorProductId: number;
  protocol: number;
  requiredDefinitionVersion: DefinitionVersion;
  hasResolvedDefinition: false;
};

export type ConnectedDevice = DeviceInfo & {
  path: string;
  vendorProductId: number;
  protocol: number;
  requiredDefinitionVersion: DefinitionVersion;
  hasResolvedDefinition: true;
};

export type AuthorizedDevices = Record<string, AuthorizedDevice>;
export type ConnectedDevices = Record<string, ConnectedDevice>;

export type MacroEditorSettings = {
  recordDelaysEnabled: boolean;
  smartOptimizeEnabled: boolean;
  tapEnterAtEOMEnabled: boolean;
};

export type TestKeyboardSoundsSettings = {
  isEnabled: boolean;
  volume: number;
  waveform: OscillatorType;
  mode: TestKeyboardSoundsMode;
  transpose: number;
};

export type Settings = {
  showDesignTab: boolean;
  disableFastRemap: boolean;
  renderMode: '3D' | '2D';
  themeMode: 'light' | 'dark';
  themeName: string;
  macroEditor: MacroEditorSettings;
  testKeyboardSoundsSettings: TestKeyboardSoundsSettings;
  designDefinitionVersion: DefinitionVersion;
};

export type CommonMenusMap = {
  [menu: string]: VIAMenu[];
};

export type StoreData = {
  definitionIndex: DefinitionIndex;
  definitions: KeyboardDictionary;
  settings: Settings;
};

export type VendorProductIdMap = Record<number, { v2: boolean; v3: boolean }>;

export type DefinitionIndex = Pick<KeyboardDefinitionIndex, 'generatedAt' | 'version' | 'theme'> & {
  supportedVendorProductIdMap: VendorProductIdMap;
  hash: string;
};

export type EncoderBehavior = [number, number, number];
