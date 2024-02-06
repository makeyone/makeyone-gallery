import { Metadata } from 'next';

import KeyGroup from '@/components/KeyboardLayout/KeyGroup';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '키보드 레이아웃 테스트 - 메이키원 갤러리',
  };
}

export default function TestKeyboardLayout() {
  return (
    <div>
      <div style={{ position: 'relative' }}>
        <div>Test Full Key</div>
        <KeyGroup />
      </div>
      {/* <div style={{ position: 'relative', top: '450px' }}>
        <div>Select Keyboard Layout</div>
        <KeyGroup />
      </div> */}
    </div>
  );
}
