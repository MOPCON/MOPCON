import { getImageSrc } from "@/components/util/getImageSrc";
import Image from "next/image";
import { SectionBlock, SectionTitle } from "@/components/ui/SectionBlock";
const BehavioralGuidelines = () => {
  return (
    <SectionBlock className="bg-[#F4F7FA]">
      <Image
        src={getImageSrc("/community/bg-wave.svg")}
        alt="behavioral-guidelines-bg"
        width={1920}
        height={1080}
        className="absolute w-full h-full object-cover left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
      />
      <div className="w-[min(90%,1062px)] mx-auto">
        <SectionTitle arrowTitle="BEHAVIORAL GUIDELINES" className="mb-10">
          我們的 <span className="text-light-green">行為準則</span>
        </SectionTitle>
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 tablet:gap-6">
          <div className="text-N800 tablet:text-lg flex flex-col gap-4">
            <p>
              所有此次活動的聽眾、演講者、贊助商和志工，都必須同意遵守下列行為準則。而主辦單位也將嚴格地執行這些準則，我們期待所有參加者的合作，以確保大家能有一個安全友善的環境。
            </p>
            <p>
              騷擾包括有關性別，性別認同、年齡、性向、殘疾、外貌、體型、種族、宗教的攻擊性言語，或是在公共場合散播色情圖片、蓄意恐嚇、跟踪、騷擾性的攝影或錄影、多次打斷活動、不恰當的身體接觸，和讓人感到不舒服的性關注。參與者必須停止任何騷擾行為並且立即遵守行為準則。贊助商也必須遵守行為準則。
            </p>
            <p>
              贊助商不應該使用帶有性意味的圖像、活動，或其它材料。工作人員（包括志工）不該穿著帶有性意味的衣服/制服/裝扮，或是建立一個具有性意味的環境。
            </p>
            <p>
              如果參與者從事騷擾行為，工作人員會採取其認為適當的任何手段，包括警告或是請離會場，並且不會退費。
            </p>
          </div>
          <div className="text-N800 tablet:text-lg flex flex-col gap-4">
            <p>
              如果你被騷擾、看到別人受到騷擾，或有任何其他問題，請立即聯繫會議工作人員，工作人員身上會穿戴可以識別身份的特殊徽章或衣服。
            </p>
            <p>
              工作人員會很樂意幫助參與者聯繫酒店/場地警衛或當地警察、提供護送，或以其他方式幫助那些遇到騷擾的參與者感到安全。我們非常重視您的參與。
            </p>
            <p>
              我們希望參與者在各活動場合、會議有關的社群活動都能遵循這些規則。
            </p>
            <p>
              此行為準則是基於 Conference Code of Conduct (
              http://confcodeofconduct.com/ )而訂定。
            </p>
          </div>
        </div>
      </div>
    </SectionBlock>
  );
};

export default BehavioralGuidelines;
