import { Metadata } from 'next';

import SelectKeyboardLayout from '@/app/test-keyboard-layout/_components/SelectKeyboardLayout';
import TestFullKey from '@/app/test-keyboard-layout/_components/TestFullKey';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '키보드 레이아웃 테스트 - 메이키원 갤러리',
  };
}

export default function TestKeyboardLayout() {
  return (
    <div>
      <TestFullKey />
      <SelectKeyboardLayout />
    </div>
  );
}
