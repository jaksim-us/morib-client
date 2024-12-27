import Dropdown from '@/shared/components/Dropdown';

import IconMeatBall from '@/shared/assets/svgs/todo_meatball_default.svg?react';

import { MoribSet } from './../../types';

interface MoribSetItemProps {
	moribSet: MoribSet;
	activeMoribSetId: number | null;
	setActiveMoribSetId: (id: number) => void;
	deleteMoribSet: (id: number) => void;
	maxIconsToShow: number;
}

const MoribSetItem = ({
	moribSet,
	activeMoribSetId,
	setActiveMoribSetId,
	deleteMoribSet,
	maxIconsToShow,
}: MoribSetItemProps) => {
	const additionalIconsCount = moribSet.urlList.length > maxIconsToShow ? moribSet.urlList.length - maxIconsToShow : 0;

	return (
		<div
			key={moribSet.id}
			className={`mb-[8px] h-[8rem] w-[36.6rem] flex-col items-start justify-end rounded-[8px] bg-gray-bg-01 p-[1.4rem] ${activeMoribSetId === moribSet.id ? 'border-[1px] border-mint-01' : ''}`}
			onClick={() => setActiveMoribSetId(moribSet.id)}
		>
			<div className="flex content-between items-center self-stretch">
				<div className="flex w-[30.8rem] items-center gap-[0.6rem]">
					<div className={`h-[1.4rem] w-[1.4rem] rounded-[70px] ${moribSet.selectedColor}`} />
					<h2
						className={`body-semibold-16 w-[28.8rem] truncate ${moribSet.moribSetName ? 'text-white' : 'text-gray-03'}`}
					>
						{moribSet.moribSetName || '모립세트 이름을 입력해주세요.'}
					</h2>
				</div>

				<Dropdown.Root>
					<Dropdown.Trigger preventPropagation={true}>
						<IconMeatBall className="cursor-pointer hover:rounded-full hover:bg-gray-bg-05" />
					</Dropdown.Trigger>
					<Dropdown.Content boxShadow="shadow-none" className="absolute left-[-10rem] w-[12.4rem] overflow-x-hidden">
						<Dropdown.Item
							label="할 일 삭제"
							textColor="red"
							onClick={() => {
								deleteMoribSet(moribSet.id);
							}}
						/>
					</Dropdown.Content>
				</Dropdown.Root>
			</div>

			<div className="mt-[0.4rem] flex items-center gap-[0.6rem]">
				{moribSet.urlList.slice(0, maxIconsToShow).map(({ faviconUrl }, url) => (
					<img key={url} src={faviconUrl} alt="favicon" className="h-[2rem] w-[2rem] rounded-full" />
				))}
				{additionalIconsCount > 0 && (
					<div className="body-detail-reg-12 flex h-[2rem] w-[2rem] items-center justify-center rounded-[57px] bg-date-active text-white">
						+{additionalIconsCount}
					</div>
				)}
			</div>
		</div>
	);
};

export default MoribSetItem;
