import { useState } from 'react';

import { ALLOW_SITE_LIST } from '@/shared/constants/allowStieList';

const PopoverAllowedService = ({
	onCancel,
	onRegister,
}: {
	onCancel: () => void;
	onRegister: (selectedNames: string[]) => void;
}) => {
	const [checkedSetIds, setCheckedSetIds] = useState<number[]>([]);
	const [selectedSetId, setSelectedSetId] = useState<number | null>(null);

	const handleCheckboxChange = (id: number) => {
		setCheckedSetIds((prev) => (prev.includes(id) ? prev.filter((checkedId) => checkedId !== id) : [...prev, id]));
	};

	const handleSetClick = (id: number) => {
		setSelectedSetId((prev) => (prev === id ? null : id));
	};

	const handleRegisterClick = () => {
		const selectedNames = ALLOW_SITE_LIST.filter((item) => checkedSetIds.includes(item.id)).map(
			(item) => item.allowedservicesetname,
		);
		onRegister(selectedNames);
	};

	return (
		<div className="ml-[4.899rem] flex h-[45rem] w-[53.2rem]">
			<div className="flex w-[23rem] flex-col rounded-l-[8px] bg-gray-bg-02 p-[1rem]">
				<h3 className="h-[3.4rem] w-[21rem] px-[1.7rem] py-[1rem] text-gray-04 detail-reg-14">허용서비스 세트</h3>
				<ul className="mt-[0.8rem] h-[32.4rem] w-[20.4rem] overflow-y-auto">
					{ALLOW_SITE_LIST.map((item) => (
						<li
							key={item.id}
							className={`flex h-[3.4rem] w-[20.4rem] cursor-pointer items-center rounded-[6px] py-[0.3rem] pl-[1rem] pr-[0.3rem] hover:bg-gray-bg-04 ${
								item.id === selectedSetId ? 'bg-gray-bg-05' : ''
							}`}
							onClick={() => handleSetClick(item.id)}
						>
							<div
								className="h-[2.8rem] w-[2.8rem] p-[0.7rem]"
								onClick={(e) => {
									e.stopPropagation();
								}}
							>
								<input
									type="checkbox"
									id={`${item.id}`}
									checked={checkedSetIds.includes(item.id)}
									onChange={() => handleCheckboxChange(item.id)}
									className="h-[1.4rem] w-[1.4rem] rounded border-gray-600 focus:ring"
								/>
							</div>
							<div className="w-[14.9rem] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-white detail-semibold-14">
								{item.allowedservicesetname}
							</div>

							<span className="h-[1rem] w-[1rem] rounded-full bg-yellow-500" />
						</li>
					))}
				</ul>
				<div className="flex h-[5.4rem] justify-end gap-[0.5rem] p-[1rem]">
					<button
						onClick={onCancel}
						className="flex h-[3.4rem] w-[5.8rem] items-center justify-center rounded-[3.297px] bg-gray-bg-06 text-white detail-semibold-14"
					>
						취소
					</button>
					<button
						onClick={handleRegisterClick}
						className="flex h-[3.4rem] w-[5.8rem] items-center justify-center rounded-[3.297px] bg-mint-02 text-black detail-semibold-14"
					>
						등록
					</button>
				</div>
			</div>

			<div className="flex w-[30.2rem] flex-col gap-[0.8rem] rounded-r-[8px] bg-gray-bg-03 py-[1rem] pl-[0.9rem] pr-[1.7rem]">
				<h3 className="h-[3.4rem] w-[28.6rem] p-[1rem] text-gray-04 detail-reg-14">허용할 사이트</h3>
				<ul className="h-[37.6rem] overflow-y-auto">
					{ALLOW_SITE_LIST.filter((item) => item.id === selectedSetId).map((item) =>
						item.allowedsites.map((site, index) => (
							<li
								key={index}
								className="flex h-[3.2rem] w-[27.6rem] items-center gap-[1rem] rounded-[3px] px-[0.7rem] odd:bg-gray-bg-02"
							>
								<img src={site.src} alt={`${site.name} Icon`} className="h-6 w-6" />
								<span className="text-white detail-reg-12">{site.name}</span>
							</li>
						)),
					)}
				</ul>
			</div>
		</div>
	);
};

export default PopoverAllowedService;
