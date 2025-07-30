import { getVerificationList } from '@/apis/admin/getVerificationList.api';
import { ButtonRound } from '@/components/common/ButtonRound';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const SignupManagement = () => {
  const navigate = useNavigate();

  const { data: verificationList } = useQuery({
    queryKey: [QUERY_KEYS.ADMIN_GET_VERIFICATION_LIST],
    queryFn: () => getVerificationList(),
  });

  const handleClickListDetail = (verification) => {
    if (
      verification.verificationType == 'PHOTO' &&
      verification.verificationStatus === 'PENDING'
    ) {
      navigate(`${verification.verificationRecordId}`);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-5">
      <div className="flex h-fit w-full flex-col gap-5 rounded-2xl bg-white p-8">
        <h1 className="text-pageTitle">가입 관리</h1>
      </div>
      <div className="relative flex h-full w-full flex-col gap-5 rounded-2xl bg-white p-8 text-base text-neutral-title">
        <h1 className="text-subTitle">가입 요청 리스트</h1>
        <table className="divide-y divide-primary-20">
          <thead>
            <tr className="h-8 text-primary-base">
              <th scope="col" className="text-start">
                인증 요청일
              </th>
              <th scope="col" className="text-start">
                학교
              </th>
              <th scope="col" className="text-start">
                학교 인증 방법
              </th>
              <th scope="col" className="text-start">
                상태
              </th>
            </tr>
          </thead>
          {verificationList &&
            verificationList.studentVerification.map((verification, index) => (
              <tbody
                key={index}
                onClick={() => handleClickListDetail(verification)}
                className="cursor-pointer"
              >
                <tr className="h-12">
                  <td>{verification.verificationRequestDate}</td>
                  <td>{verification.univName}</td>
                  <td>{verification.verificationType}</td>
                  <td>
                    <ButtonRound
                      text={verification.verificationStatus}
                      theme={verification.verificationStatus}
                      size="short"
                    />
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
};
