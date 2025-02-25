import { ReactNode } from 'react';

import FriendUserProfile from '../../FriendUserProfile/FriendUserProfile';

interface FriendsData {
	id: number;
	name: string;
	image: string;
	email: string;
	isPlaying: boolean;
	time: number;
	categoryName: string;
}

type FriendsInfoProp = {
	friendsData: FriendsData[];
	children: ReactNode;
};

const FriendsListRequested = ({ children, friendsData }: FriendsInfoProp) => {
	return (
		<>
			{friendsData.map((friend) => {
				return (
					<li key={friend.id} className="flex w-full border-t-[1px] border-gray-bg-06 px-[1rem] py-[2rem]">
						<div className="flex w-[40rem]">
							<FriendUserProfile imgSrc={friend.image} />
							<div className="ml-[2rem] flex flex-col justify-center">
								<p className="text-white subhead-bold-20">{friend.name}</p>
								<p className="text-gray-04 body-reg-16">{friend.email}</p>
							</div>
						</div>
						{children}
					</li>
				);
			})}
		</>
	);
};

export default FriendsListRequested;
