import React from 'react';

import { Metadata } from 'next';

import useServerI18n from '@/hooks/useServerI18n';

import { bindClassNames } from '@/libs/BindClassName';

import styles from './page.module.css';

const cx = bindClassNames(styles);

export async function generateMetadata(): Promise<Metadata> {
  const t = await useServerI18n('terms-service');

  return {
    title: t('meta_title'),
    robots: 'noindex, nofollow',
  };
}

type Props = {};

export default async function ServiceTermsPage({}: Props) {
  const t = await useServerI18n('terms-service');

  const sections = [
    { title: t('terms_1_title'), body: t('terms_1_body') },
    { title: t('terms_2_title'), body: t('terms_2_body') },
    { title: t('terms_3_title'), body: t('terms_3_body') },
    { title: t('terms_4_title'), body: t('terms_4_body') },
    { title: t('terms_5_title'), body: t('terms_5_body') },
    { title: t('terms_6_title'), body: t('terms_6_body') },
    { title: t('terms_7_title'), body: t('terms_7_body') },
    { title: t('terms_8_title'), body: t('terms_8_body') },
    { title: t('terms_9_title'), body: t('terms_9_body') },
    { title: t('terms_10_title'), body: t('terms_10_body') },
    { title: t('terms_11_title'), body: t('terms_11_body') },
    { title: t('terms_12_title'), body: t('terms_12_body') },
    { title: t('terms_13_title'), body: t('terms_13_body') },
  ];

  return (
    <div className={cx('root')}>
      <h1 className={cx('pageTitle')}>{t('terms_title')}</h1>
      <div className={cx('contentBlock')}>
        {sections.map((section) => (
          <div className={cx('paragraphBlock')} key={section.title}>
            <h2 className={cx('paragraphTitle')}>{section.title}</h2>
            <p className={cx('paragraph')}>
              {section.body.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        ))}
        {/* <div className={cx('paragraphBlock')}>
          <h2 className={cx('paragraphTitle')}>제 1조 목적</h2>
          <p className={cx('paragraph')}>
            본 약관은 회원(본 약관에 동의한 자를 말하며 이하 "회원"이라고 합니다)이 메이키원(이하 "메이키원"이라고 합니다)이
            제공하는 서비스를 이용함에 있어 메이키원과 회원의 권리 의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>
        </div>
        <div className={cx('paragraphBlock')}>
          <h2 className={cx('paragraphTitle')}>제 2조 정의</h2>
          <p className={cx('paragraph')}>
            이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
            <br />
            "회원"이라 함은 메이키원의 서비스에 접속하여 이 약관에 따라 "메이키원"과 이용계약을 체결하고 "메이키원"이 제공하는
            "서비스" 를 이용하는 고객을 말합니다.
            <br />
            "아이디(Id)" 또는 "이메일(E-mail)"라 함은 "회원"의 식별과 "서비스" 이용을 위하여 "회원"이 정하고 "메이키원"가 승인하는
            문자와 숫자의 조합을 말합니다.
            <br />
            "게시글" 또는 "포스트"이라 함은 "회원"이 "서비스"를 이용함에 있어 "서비스상"에 게시한 부호·문자·음성·음향·화상·동영상
            등의 정보 형태의 글, 사진, 동영상 및 각종 파일과 링크 등을 말합니다.
            <br />
            "회원탈퇴"라 함은 "회원"이 "서비스"를 더 이상 이용하기를 원치 않을 때 "메이키원" 서비스를 해지할 수 있음을 말합니다.
          </p>
        </div>
        <div className={cx('paragraphBlock')}>
          <h2 className={cx('paragraphTitle')}>제 3조 개인정보보호 의무</h2>
          <p className={cx('paragraph')}>
            "메이키원"은 "정보통신망법" 등 관계 법령이 정하는 바에 따라 "회원"의 "개인정보"를 보호하기 위해 노력합니다.
            <br />
            "개인정보"의 보호 및 사용에 대해서는 관련법 및 "메이키원"의 개인정보보호정책이 적용됩니다.
            <br />
            다만, "메이키원"의 공식 사이트 이외의 링크된 사이트에서는 "메이키원"의 개인정보보호정책이 적용되지 않습니다.
          </p>
        </div>
        <div className={cx('paragraphBlock')}>
          <h2 className={cx('paragraphTitle')}>제 4조 약관의 게시와 개정</h2>
          <p className={cx('paragraph')}>
            "메이키원"은 이 약관의 내용을 "회원"이 쉽게 알 수 있도록 초기화면에 게시합니다.
            <br />
            "메이키원"은 "약관의규제에관한법률", "정보통신망이용촉진및정보보호에관한법률(이하 "정보통신망법")" 등 관련법을
            위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
            <br />
            "메이키원"이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 제1항의 방식에 따라 그 개정약관의
            적용일자 30일 전부터 적용일자 전일까지 공지합니다. 다만, 회원에게 불리한 내용으로 약관을 개정하는 경우에는 공지 외에
            회원정보에 등록된 이메일 등 전자적 수단을 통해 별도로 명확히 통지하도록 합니다. <br />
            "메이키원"이 전항에 따라 공지하면서 회원에게 30일 기간 이내에 의사표시를 하지 않으면 승인한 것으로 본다는 뜻을
            명확하게 공지하였음에도 회원이 명시적으로 거부의사를 밝히지 않은 경우에회원이 개정약관에 동의한 것으로 봅니다.
            <br />
            "회원"이 개정약관에 동의하지 않는 경우 메이키원은 개정약관의 내용을 적용할 수 없으며, 이 경우 회원은 "회원탈퇴"를 통해
            서비스를 해지할 수 있습니다.
          </p>
        </div>
        <div className={cx('paragraphBlock')}>
          <h2 className={cx('paragraphTitle')}>제 5조 권리의 귀속 및 저작물의 이용</h2>
          <p className={cx('paragraph')}>
            메이키원이 회원에게 제공하는 각종 서비스에 대한 저작권을 포함한 일체의 권리는 메이키원에 귀속되며 회원이 서비스를
            이용하는 과정에서 작성한 게시글 등(이하 "게시글 등"이라 합니다)에 대한 저작권을 포함한 일체에 관한 권리는 별도의
            의사표시가 없는 한 각 회원에게 귀속됩니다.
            <br />
            게시글 등은 메이키원이 운영하는 인터넷 사이트 및 모바일 어플리케이션을 통해 노출될 수 있으며, 검색결과 내지 관련
            프로모션 등에도 노출될 수 있습니다. 또한, 해당 노출을 위해 필요한 범위 내에서는 일부 수정, 편집되어 게시될 수
            있습니다. 이 경우, 메이키원은 저작권법 규정을 준수하며, 회원은 언제든지 고객센터 또는 각 서비스 내 관리기능을 통해
            해당 게시글 등에 대해 삭제, 비공개 등의 조치를 취할 수 있습니다.
            <br />
            메이키원은 제2항 이외의 방법으로 회원의 게시글 등을 이용하고자 하는 경우에는 전화, 팩스, 전자우편 등을 통해 사전에
            회원의 동의를 얻습니다.
          </p>
        </div>
        <div className={cx('paragraphBlock')}>
          <h2 className={cx('paragraphTitle')}>제 6조 서비스의 변경, 중단, 일시 중지</h2>
          <p className={cx('paragraph')}>
            메이키원은 서비스의 일부 또는 전부를 메이키원의 사업 계획 및 서비스 운영정책에 따라 수정·변경 및 중단할 수 있으며,
            이에 대하여 관련 법령에 특별한 규정이 없는 한 회원에게 별도의 보상을 하지 않습니다.
            <br />
            메이키원은 서비스용 설비 점검·보수·공사 및 기간통신사업자의 전기통신 서비스의 중지, 서비스 이용의 폭주나 국가비상사태
            등을 사유로 서비스 제공에 장애가 발생한 경우 그 사유가 해소될 때까지 서비스를 일시 중지할 수 있습니다.
            <br />
            메이키원은 본 조에 따른 서비스의 변경·중단·일시 중지의 사유가 발생한 경우, 서비스를 통해 공지하는 등의 방법으로
            회원에게 통지합니다.
          </p>
        </div>
        <div className={cx('paragraphBlock')}>
          <h2 className={cx('paragraphTitle')}>제 7조 "회원"에 대한 통지</h2>
          <p className={cx('paragraph')}>
            "메이키원"이 "회원"에 대한 통지를 하는 경우 본 약관에 별도 규정이 없는 한 "회원"이 지정한 전자우편주소, 알림 메시지
            등으로 할 수 있습니다.
            <br /> "메이키원"은 "회원" 전체에 대한 통지의 경우 7일 이상 "메이키원"의 공지사항 페이지에 게시함으로써 제1항의 통지에
            갈음할 수 있습니다.
          </p>
        </div>
        <div className={cx('paragraphBlock')}>
          <h2 className={cx('paragraphTitle')}>제 8조 이용제한 등</h2>
          <p className={cx('paragraph')}>
            "메이키원"은 "회원"이 본 약관의 의무를 위반하거나 서비스의 정상적인 운영을 방해한 경우, 서비스 이용을 경고, 일시정지,
            회원탈퇴, 접속제한으로 단계적으로 제한할 수 있습니다.
            <br />
            "메이키원"은 전항에도 불구하고, "저작권법" 및 "컴퓨터프로그램보호법"을 위반한 불법프로그램의 제공 및 운영방해,
            "정보통신망법"을 위반한 불법통신 및 해킹, 악성프로그램의 배포, 접속권한 초과행위 등과 같이 관련법을 위반한 경우에는
            즉시 회원탈퇴 및 접속제한을 할 수 있습니다.
            <br />
            본 항에 따른 계약해지 시 서비스 이용을 통해 획득한 혜택 등도 모두 소멸되며, 메이키원은 이에 대해 별도로 보상하지
            않습니다.
            <br />
            "메이키원"은 본 조의 이용제한 범위 내에서 제한의 조건 및 세부내용은 이용제한정책 등에서 정한 바에 의합니다.
            <br />본 조에 따라 서비스 이용을 제한하거나 서비스를 탈퇴하는 경우에는 "메이키원"은 제6조["회원"에 대한 통지]에 따라
            통지합니다.
            <br />
            "회원"은 본 조에 따른 이용제한 등에 대해 "메이키원"이 정한 절차에 따라 이의신청을 할 수 있습니다. 이 때 이의가
            정당하다고 메이키원이 인정하는 경우 메이키원은 즉시 서비스의 이용을 재개합니다.
          </p>
        </div>
        <div className={cx('paragraphBlock')}>
          <h2 className={cx('paragraphTitle')}>제 9조 게시글의 관리</h2>
          <p className={cx('paragraph')}>
            "회원"의 게시글이 "정보통신망법" 및 "저작권법"등 관련법에 위반되는 내용을 포함하는 경우, 권리자는 관련법이 정한 절차에
            따라 해당 게시글의 게시중단 및 삭제 등을 요청할 수 있으며, "메이키원"은 관련법에 따라 조치를 취하여야 합니다.
            <br />
            "메이키원"은 전항에 따른 권리자의 요청이 없는 경우라도 권리침해가 인정될 만한 사유가 있거나 기타 메이키원 정책 및
            관련법에 위반되는 경우에는 관련법에 따라 해당 게시글에 대해 임시조치 등을 취할 수 있습니다.
            <br />본 조에 따른 세부절차는 "정보통신망법" 및 "저작권법"이 규정한 범위 내에서 메이키원이 정한 게시중단요청서비스에
            따릅니다.
            <br />
            "메이키원"은 커뮤니티 가이드라인에 따라 게시글의 게시중단 및 삭제처리를 할 수 있습니다.
          </p>
        </div>
        <div className={cx('paragraphBlock')}>
          <h2 className={cx('paragraphTitle')}>제 10조 권리의 귀속</h2>
          <p className={cx('paragraph')}>
            "서비스"에 대한 저작권 및 지적재산권은 메이키원에 귀속됩니다. 단, 회원의 게시글 및 제휴계약에 따라 제공된 저작물 등은
            제외합니다.
            <br />
            "메이키원"은 서비스와 관련하여 회원에게 메이키원이 정한 이용조건에 따라 계정, 아이디, 콘텐츠 등을 이용할 수 있는
            이용권만을 부여하며, "회원"은 이를 양도, 판매, 담보제공 등의 처분행위를 할 수 없습니다.
          </p>
        </div>
        <div className={cx('paragraphBlock')}>
          <h2 className={cx('paragraphTitle')}>제 11조 책임제한</h2>
          <p className={cx('paragraph')}>
            "메이키원"은 천재지변 또는 이에 준하는 불가항력으로 인하여 "서비스"를 제공할 수 없는 경우에는 "서비스" 제공에 관한
            책임이 면제됩니다.
            <br />
            "메이키원"은 "회원" 의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.
            <br />
            "메이키원"은 "회원"이 "서비스"와 관련하여 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 책임을 지지
            않습니다.
            <br />
            "메이키원"은 "회원" 간 또는 "회원"과 제3자 상호간에 "서비스"를 매개로 하여 거래 등을 한 경우에는 책임이 면제됩니다.
            <br />
            "메이키원"은 무료로 제공되는 서비스 이용과 관련하여 관련법에 특별한 규정이 없는 한 책임을 지지 않습니다.
          </p>
        </div>
        <div className={cx('paragraphBlock')}>
          <h2 className={cx('paragraphTitle')}>제 12조 준거법 및 재판관할</h2>
          <p className={cx('paragraph')}>
            "메이키원"와 "회원" 간 제기된 소송은 대한민국법을 준거법으로 합니다.
            <br />
            "메이키원"와 "회원"간 발생한 분쟁에 관한 소송은 제소 당시의 "회원"의 주소에 의하고, 주소가 없는 경우 거소를 관할하는
            지방법원의 전속관할로 합니다. 단, 제소 당시 "회원"의 주소 또는 거소가 명확하지 아니한 경우의 관할법원은 민사소송법에
            따라 정합니다.
            <br />
            해외에 주소나 거소가 있는 '회원' 의 경우 "메이키원"와 "회원"간 발생한 분쟁에 관한 소송은 전항에도 불구하고 대한민국
            서울중앙지방법원을 관할 법원으로 합니다.
          </p>
        </div>
        <div className={cx('paragraphBlock')}>
          <h2 className={cx('paragraphTitle')}>부칙 (2025년 3월 15일)</h2>
          <p className={cx('paragraph')}>본 약관은 2025년 3월 15일부터 적용됩니다.</p>
        </div> */}
      </div>
    </div>
  );
}
