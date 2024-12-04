import Dropdown from '@/shared/components/Dropdown';

import IconPlus from '@/shared/assets/svgs/plus.svg?react';
import IconMeatBall from '@/shared/assets/svgs/todo_meatball_default.svg?react';

import { MoribSet } from './../types';

interface CategoryMoribSetProps {
	moribSets: MoribSet[];
	activeMoribSetId: number | null;
	setActiveMoribSetId: (id: number) => void;
	addMoribSet: () => void;
	deleteMoribSet: (id: number) => void;
}

const CategoryMoribSet = ({
	moribSets,
	activeMoribSetId,
	setActiveMoribSetId,
	addMoribSet,
	deleteMoribSet,
}: CategoryMoribSetProps) => {
	const maxIconsToShow = 5;

	return (
		<div className="ml-[4.2rem] h-[99.6rem] w-[40.2rem] flex-shrink-0 rounded-[1.6rem] bg-gray-bg-03">
			<div className="mb-[2.4rem] mt-[2.2rem] flex items-center justify-between px-[2.8rem]">
				<h1 className="head-bold-24 text-white">내 모립세트</h1>
				<IconPlus className="cursor-pointer" onClick={addMoribSet} />
			</div>

			<div className="mx-[1.8rem] gap-[10px]">
				{moribSets.map((moribSet) => {
					const additionalIconsCount =
						moribSet.urlList.length > maxIconsToShow ? moribSet.urlList.length - maxIconsToShow : 0;

					return (
						<div
							key={moribSet.id}
							className={`mb-[8px] h-[8rem] w-[36.6rem] flex-col items-start justify-end rounded-[8px] bg-gray-bg-01 p-[1.4rem] ${activeMoribSetId === moribSet.id ? 'border-[1px] border-mint-01' : ''}`}
							onClick={() => setActiveMoribSetId(moribSet.id)}
						>
							<div className="flex content-between items-center self-stretch">
								<div className="flex w-[30.8rem] items-center gap-[6px]">
									<div
										className="h-[1.4rem] w-[1.4rem] rounded-[70px]"
										style={{ backgroundColor: moribSet.selectedColor }}
									/>
									<h2
										className={`body-semibold-16 w-[28.8rem] truncate ${moribSet.moribSetName ? 'text-white' : 'text-gray-03'}`}
									>
										{moribSet.moribSetName || '모립세트 이름을 입력해주세요.'}
									</h2>
								</div>

								<Dropdown.Root>
									<Dropdown.Trigger>
										<IconMeatBall className="cursor-pointer" />
									</Dropdown.Trigger>
									<Dropdown.Content
										boxShadow="shadow-none"
										className="top-[26px] w-[12.4rem] overflow-x-hidden overflow-y-hidden"
									>
										<Dropdown.Item label="할 일 삭제" textColor="red" onClick={() => deleteMoribSet(moribSet.id)} />
									</Dropdown.Content>
								</Dropdown.Root>
							</div>

							<div className="mt-[0.4rem] flex items-center gap-[6px]">
								{moribSet.urlList.slice(0, maxIconsToShow).map(({ faviconUrl }, url) => (
									<img key={url} src={faviconUrl} alt="`favicon" className="h-[2rem] w-[2rem] rounded-full" />
								))}
								{additionalIconsCount > 0 && (
									<div className="body-detail-reg-12 flex h-[2rem] w-[2rem] items-center justify-center rounded-[57px] bg-date-active text-white">
										+{additionalIconsCount}
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default CategoryMoribSet;
