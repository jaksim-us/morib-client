import IconPlus from '@/shared/assets/svgs/plus.svg?react';

import { MoribSet } from './../types';
import BoxMoribSetItem from './Box/BoxMoribSetItem';

interface CategoryAllowedSProps {
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
}: CategoryAllowedSProps) => {
	const maxIconsToShow = 5;

	return (
		<div className="relative z-0 ml-[4.2rem] h-[99.6rem] w-[40.2rem] flex-shrink-0 overflow-x-hidden overflow-y-scroll rounded-[1.6rem] bg-gray-bg-03">
			<div className="mb-[2.4rem] mt-[2.2rem] flex items-center justify-between px-[2.8rem]">
				<h1 className="head-bold-24 text-white">내 모립세트</h1>
				<IconPlus className="cursor-pointer" onClick={addMoribSet} />
			</div>

			<div className="mx-[1.8rem] gap-[1rem]">
				{moribSets.map((moribSet) => (
					<BoxMoribSetItem
						key={moribSet.id}
						moribSet={moribSet}
						activeMoribSetId={activeMoribSetId}
						setActiveMoribSetId={setActiveMoribSetId}
						deleteMoribSet={deleteMoribSet}
						maxIconsToShow={maxIconsToShow}
					/>
				))}
			</div>
		</div>
	);
};

export default CategoryMoribSet;
