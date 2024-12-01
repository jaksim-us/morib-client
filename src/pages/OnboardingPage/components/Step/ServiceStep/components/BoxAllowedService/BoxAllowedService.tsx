import { HomeLargeBtnVariant } from '@/shared/types/global';

import HomeLargeBtn from '@/components/atoms/HomeLargeBtn';

import { ColorIcon, DesignSmIcon, MinusIcon, PencilIcon } from '../../../assets/svgs';

const mockData = [
	{ id: 1, name: 'Pinterest', url: 'https://kr.pinterest.com/' },
	{ id: 2, name: 'Pinterest', url: 'https://kr.pinterest.com/' },
	{ id: 3, name: 'Pinterest', url: 'https://kr.pinterest.com/' },
	{ id: 4, name: 'Pinterest', url: 'https://kr.pinterest.com/' },
	{ id: 5, name: 'Pinterest', url: 'https://kr.pinterest.com/' },
	{ id: 6, name: 'Pinterest', url: 'https://kr.pinterest.com/' },
	{ id: 7, name: 'Pinterest', url: 'https://kr.pinterest.com/' },
	{ id: 8, name: 'Pinterest', url: 'https://kr.pinterest.com/' },
	{ id: 9, name: 'Pinterest', url: 'https://kr.pinterest.com/' },
	{ id: 10, name: 'Pinterest', url: 'https://kr.pinterest.com/' },
	{ id: 11, name: 'Pinterest', url: 'https://kr.pinterest.com/' },
	{ id: 12, name: 'Pinterest', url: 'https://kr.pinterest.com/' },
	{ id: 13, name: 'Pinterest', url: 'https://kr.pinterest.com/' },
	{ id: 14, name: 'Pinterest', url: 'https://kr.pinterest.com/' },
	{ id: 15, name: 'Pinterest', url: 'https://kr.pinterest.com/' },
	{ id: 16, name: 'Pinterest', url: 'https://kr.pinterest.com/' },
];

const BoxAllowedService = () => {
	return (
		<div className="flex h-screen w-[48.7rem] flex-shrink-0 pb-[4.8rem] pr-[4.2rem] pt-[11.8rem]">
			<div className="grid w-full grid-rows-[auto,1fr,auto] rounded-[18px] bg-gray-bg-03 p-[2.8rem]">
				<div className="flex items-center">
					<button>
						<ColorIcon />
					</button>
					<h2 className="head-bold-30 ml-[1rem] text-white">나의 모립세트</h2>
					<button className="ml-[1.7rem]">
						<PencilIcon />
					</button>
				</div>

				<ul className="mt-[2rem] overflow-auto">
					{mockData.map((data) => (
						<li
							key={data.id}
							className="flex h-[5.4rem] w-full items-center border-b border-b-gray-bg-04 px-[1rem] py-[1.2rem]"
						>
							<DesignSmIcon />
							<h3 className="body-med-16 ml-[1.2rem] p-0 text-white">{data.name}</h3>
							<div className="body-reg-16 ml-[4.2rem] flex h-[3.1rem] w-[23.1rem] items-center rounded-[20px] bg-gray-bg-04 px-[1rem] py-[0.6rem] text-gray-04">
								{data.url}
							</div>
							<button>
								<MinusIcon className="ml-[1.25rem]" />
							</button>
						</li>
					))}
				</ul>

				<HomeLargeBtn variant={HomeLargeBtnVariant.MIDDLE} className="mt-[2rem]">
					모두 입력했어요
				</HomeLargeBtn>
			</div>
		</div>
	);
};

export default BoxAllowedService;
