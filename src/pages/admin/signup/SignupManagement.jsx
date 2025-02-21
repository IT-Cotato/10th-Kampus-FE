import { getVerificationList } from "@/apis/admin/getVerificationList.api";
import { ButtonRound } from "@/components/common/ButtonRound";
import { QUERY_KEYS } from "@/constants/api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const SignupManagement = () => {
    const navigate = useNavigate();

    const { data: verificationList } = useQuery({
        queryKey: [QUERY_KEYS.ADMIN_GET_VERIFICATIOIN_LIST],
        queryFn: () => getVerificationList(),
      });
    
  return (
    <div className="flex flex-col flex-1 gap-5 px-5">
      <div className="flex flex-col w-full gap-5 p-8 bg-white h-fit rounded-2xl">
        <h1 className="text-pageTitle">가입 관리</h1>
      </div>
      <div className="relative flex flex-col w-full h-full gap-5 p-8 text-base bg-white rounded-2xl text-neutral-title">
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
            verificationList.studentVerification.map((verfication, index) => (
              <tbody key={index} onClick={() => navigate('')} className="cursor-pointer">
                <tr className="h-12">
                  <td>{verfication.verificationRequestDate}</td>
                  <td>{verfication.univName}</td>
                  <td>
                    {verfication.verificationType}
                  </td>
                  <td>
                    <ButtonRound
                      text={verfication.verificationStatus}
                      theme={verfication.verificationStatus}
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
