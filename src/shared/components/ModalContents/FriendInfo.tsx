import FriendUserProfile from '@/shared/components/ModalContents/FriendUserProfile';

import { formatSecondsForFriendsList } from '@/shared/utils/time';

interface FriendsData {
	id: number;
	name: string;
	image: string;
	email: string;
	isPlaying: boolean;
	time: number;
	categoryname: string;
}

type FriendsInfoProp = {
	friendsData: FriendsData[];
};

const FriendInfo = ({ friendsData }: FriendsInfoProp) => {
	return (
		<>
			{friendsData.map((friend: FriendsData) => {
				return (
					<li key={friend.id} className="flex border-t-[1px] border-gray-bg-06 px-[1rem] py-[1.5rem]">
						<div className="flex w-[40rem]">
							<FriendUserProfile isConnecting={friend.isPlaying} imgSrc={friend.image} />
							<div className="ml-[2rem] flex flex-col justify-center">
								<p className="subhead-bold-20 text-white">{friend.name}</p>
								<p className="body-reg-16 text-gray-04">{friend.email}</p>
							</div>
						</div>
						<p className="subhead-med-18 flex w-[30rem] self-center p-[0.8rem] text-white">
							{friend.isPlaying ? '온라인' : '오프라인'}
						</p>
						<p className="subhead-med-18 flex w-[46rem] self-center p-[0.8rem] text-white">
							{formatSecondsForFriendsList(friend?.time)}
						</p>
					</li>
				);
			})}
		</>
	);
};

export default FriendInfo;
