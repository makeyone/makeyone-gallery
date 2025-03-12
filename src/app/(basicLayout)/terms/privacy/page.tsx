import { Metadata } from 'next';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './page.module.css';

const cx = bindClassNames(styles);

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '개인정보 처리방침 - 메이키원',
    robots: 'noindex, nofollow',
  };
}

type Props = {};

export default async function PrivacyTermsPage({}: Props) {
  return (
    <div className={cx('root')}>
      <h1 className={cx('pageTitle')}>개인정보 처리방침</h1>
      <div className={cx('contentBlock')}>
        <div className={cx('paragraphBlock')}>
          <h2 className={cx('paragraphTitle')}>1. 개인정보의 수집 및 이용 목적</h2>
          <p className={cx('paragraph')}>
            메이키원(이하 "메이키원")은 수집한 개인정보를 다음의 목적을 위해 활용합니다.
            <br />
            1. 회원 관리
            <br />
            2. 서비스 제공
          </p>
        </div>
        <div className={cx('paragraphBlock')}>
          <h2 className={cx('paragraphTitle')}>2. 개인정보의 보유 및 이용기간</h2>
          <p className={cx('paragraph')}>
            소비자의 불만 또는 분쟁처리에 관한 기록
            <br />
            보존 이유: 전자상거래 등에서의 소비자보호에 관한 법룔 제6조 및 시행령 제6조
            <br />
            보존 기간: 3년
            <br />
            <br />
            본인확인에 관한 기록 보존
            <br />
            이유: 정보통신망 이용촉진 및 정보보호에 관한 법률 제 44조의5 및 시행령 제 29조
            <br />
            보존 기간: 6개월 접속에 관한 기록 보존 이유: 통신비밀보호법 제15조의2 및 시행령 제41조
            <br />
            보존 기간: 3개월
          </p>
        </div>
        <div className={cx('paragraphBlock')}>
          <h2 className={cx('paragraphTitle')}>3. 수집하는 개인정보의 항목</h2>
          <p className={cx('paragraph')}>
            메이키원는 회원가입, 서비스 이용 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
            <br />
            1. 수집항목
            <br />
            - 소셜 미디어 서비스 ID: 사용자의 구분
            <br />
            - 이메일: 사용자의 구분 및 이메일을 통한 연락을 위함
            <br />
            - 닉네임: 콘텐츠에서 작성자의 정보를 보여주기 위함
            <br />
            - 프로필 사진: 콘텐츠에서 작성자의 정보를 보여주기 위함
            <br />
            - 성별(선택 항목): 마케팅 및 통계
            <br />
            - 생년월일(선택 항목): 마케팅 및 통계
            <br />
            - 자동 수집항목: IP 정보, 이용 기록, 접속 로그, 쿠키, 접속 기록 등
            <br />
            <br />
            개인정보 수집방법: 홈페이지(소셜 로그인을 통한 회원 가입)
          </p>
        </div>
        <div className={cx('paragraphBlock')}>
          <h2 className={cx('paragraphTitle')}>4. 개인정보의 파기절차 및 방법</h2>
          <p className={cx('paragraph')}>
            회원은 로그인 후 마이페이지에서 서비스를 탈퇴할 수 있습니다.
            <br />
            또는, 가입한 계정의 이메일을 사용하여 본 약관(7. 개인정보보호를 위한 기술적, 관리적 조치 및 담당자)의 개인정보 관리 및
            처리 담당자에게 이메일을 발송하여 탈퇴 요청을 할 수 있습니다.
            <br />
            서비스를 탈퇴하여도 소셜과의 연결은 끊어지지 않습니다.
            <br />
            소셜과 연결을 해지하고 싶으시면 회원가입한 소셜(NAVER, KAKAO, GOOGLE, DISCORD)에서 해지해주세요.
            <br />
            <br />
            - 파기절차
            <br />
            탈퇴처리가 진행되면 계정정보는 내부 방침 및 기타 관련 법령에 의한 정보보호보유 사유에 따라 일정 기간 저장된 후
            파기됩니다.
            <br />
            다만, 해당 계정으로 작성된 게시글과 같이 활동한 내역은 삭제되지 않습니다.
            <br />
            이때, 탈퇴가 진행된 개인정보는 회원이 동의한 목적을 초과하거나 혹은 법률이 정한 경우 외의 다른 목적으로 이용되지
            않습니다.
            <br />
            <br />
            - 파기 방법
            <br />
            전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법 또는 물리적 방법을 사용하여 파기합니다.
          </p>
        </div>
        <div className={cx('paragraphBlock')}>
          <h2 className={cx('paragraphTitle')}>5. 개인정보 제공</h2>
          <p className={cx('paragraph')}>
            메이키원는 회원의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.
            <br />
            - 회원들이 사전에 동의한 경우
            <br />- 법령의 규정에 의거하거나, 수사 목적으로의 요구가 있는 경우
          </p>
        </div>
        <div className={cx('paragraphBlock')}>
          <h2 className={cx('paragraphTitle')}>6. 정보주체의 권리와 의무</h2>
          <p className={cx('paragraph')}>
            - 정보주체의 권리
            <br />
            회원은 언제든지 수집 정보에 대하여 수정, 동의 철회, 삭제, 열람을 요청할 수 있습니다. 다만, 동의 철회, 삭제 시 서비스의
            일부 또는 전부 이용이 제한될 수 있으며 아래의 경우에는 동의 철회, 삭제가 어려울 수 있습니다.
            <br />
            1. 법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여 불가피한 경우
            <br />
            2. 다른 사람의 생명·신체를 해할 우려가 있거나 다른사람의 재산과 그 밖의 이익을 부당하게 침해할 우려가 있는 경우
            <br />
            3. 개인정보를 처리하지 아니하면 정보 주체와 약정한 서비스를 제공하지 못하는 등 계약의 해지 의사를 명확하게 밝히지
            아니한 경우
            <br />
            <br />
            - 정보주체의 의무
            <br />
            회원은 자신의 개인정보를 보호할 의무가 있으며, 메이키원의 귀책사유가 없이 ID(이메일 주소), 접근매체 등의
            양도·대여·분실이나 로그인 상태에서 이석 등 회원 본인의 부주의나 관계법령에 의한 보안조치로 차단할 수 없는 방법이나
            기술을 사용한 해킹 등 메이키원의 상당한 주의에도 불구하고 통제할 수 없는 인터넷상의 문제 등으로 개인정보가 유출되어
            발생한 문제에 대해 메이키원은 책임을 지지 않습니다.
            <br />
            회원은 자신의 개인정보를 최신의 상태로 유지해야 하며, 회원의 부정확한 정보 입력으로 발생하는 문제의 책임은 회원
            자신에게 있습니다. 타인의 개인정보를 도용한 회원가입 또는 ID 등을 도용하여 서비스 이용 시 고객 자격 상실과 함께
            관계법령에 의거하여 처벌될 수 있습니다.
            <br />
            회원은 ID(이메일) 등에 대해 보안을 유지할 책임이 있으며 제3자에게 이를 양도하거나 대여할 수 없습니다. 회원은
            메이키원의 개인정보보호 정책에 따라 보안을 위한 주기적인 활동에 협조할 의무가 있습니다.
          </p>
        </div>
        <div className={cx('paragraphBlock')}>
          <h2 className={cx('paragraphTitle')}>7. 개인정보보호를 위한 기술적, 관리적 조치 및 담당자</h2>
          <p className={cx('paragraph')}>
            메이키원은 회원분들의 개인정보를 보호하기 위해 아래와 같은 대책을 시행하고 있습니다.
            <br />
            <br />
            1. 법령에서 암호화를 요구하는 정보에 대하여 암호화 하여 보관하고 있습니다.
            <br />
            2. 개인정보보호 관리 계획을 수립하고 운영하고 있으며, 언제나 메이키원 회원의 개인정보 보호를 보호하기 위해 노력하고
            있습니다.
            <br />
            <br />
            개인정보 관리 및 처리 담당자
            <br />
            성명: 김이준
            <br />
            이메일: support@makeyone.com
          </p>
        </div>
        <div className={cx('paragraphBlock')}>
          <h2 className={cx('paragraphTitle')}>8. 정보주체의 권익침해에 대한 구제 방법</h2>
          <p className={cx('paragraph')}>
            고객은 개인정보 침해로 인한 구제를 받기 위하여 개인정보침해 신고센터, 개인정보분쟁조정위원회, 한국인터넷진흥원
            개인정보침해신고센터 등에 분쟁 해결이나 상담 등을 신청할 수 있습니다.
            <br />
            기타 개인정보 침해 신고나 상담이 필요하신 경우에는 아래 기관에 문의 가능합니다.
            <br />
            <br />
            - 개인정보침해 신고센터 (국번없이 118)
            <br />
            - 대검찰청 사이버수사과 (국번없이 1301)
            <br />
            - 경찰청 사이버수사국 (국번없이 182)
            <br />
            - 개인정보 분쟁조정위원회 (국번없이 1833-6972)
            <br />
            <br />
            메이키원이 제공하는 서비스를 이용하면서 발생하는 모든 개인정보 보호 관련 문의, 불만, 피해구제 등에 관한 사항은 본
            약관(7. 개인정보보호를 위한 기술적, 관리적 조치 및 담당자)의 개인정보 관리 및 처리 담당자에게 연락하여 문의할 수
            있습니다. <br />
            메이키원은 이러한 문의에 대해 지체 없이 답변 및 처리할 것입니다.
          </p>
        </div>
        <div className={cx('paragraphBlock')}>
          <h2 className={cx('paragraphTitle')}>9. 개인정보처리방침의 개정과 고지</h2>
          <p className={cx('paragraph')}>
            개인정보 처리방침을 변경하는 경우 메이키원은 홈페이지의 공지사항을 통해 공지하고, 회원는 언제든지 변경된 사항을 쉽게
            알아볼 수 있도록 조치하겠습니다.
            <br />
            개인정보처리방침 공지 일자 : 2025년 3월 15일
            <br />
            개인정보처리방침 시행 일자 : 2025년 3월 15일
          </p>
        </div>
        <div className={cx('paragraphBlock')}>
          <h2 className={cx('paragraphTitle')}></h2>
          <p className={cx('paragraph')}></p>
        </div>
      </div>
    </div>
  );
}
