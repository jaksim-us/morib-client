import { userFriendData } from '@/shared/mocks/userFriendData';

import FriendInfo from './components/FriendInfo';

const FriendsList = () => {
	return (
		<div>
			{userFriendData.length > 0 ? (
				<div className="mt-[3rem] flex w-full flex-col">
					<div className="body-reg-16 flex p-[1rem] text-gray-05">
						<div className="w-[40rem]">사용자</div>
						<div className="w-[30rem]">현재 상태</div>
						<div className="w-[46rem]">오늘 몰입 시간</div>
					</div>
					<ul className="h-[57.5rem] overflow-scroll">
						<FriendInfo friendsData={userFriendData} />
					</ul>
				</div>
			) : (
				<div className="flex h-[57rem] flex-col items-center justify-center">
					<p className="title-med-32 mb-[2rem] text-gray-05">함께 몰입할 친구를 추가해보세요!</p>
					<button className="subhead-bold-20 flex flex-shrink-0 items-center justify-center rounded-[0.8rem] bg-main-gra-01 px-[6.2rem] py-[2rem] text-gray-01 hover:bg-main-gra-hover active:bg-main-gra-press">
						친구 추가하기
					</button>
				</div>
			)}
		</div>
	);
};

export default FriendsList;
