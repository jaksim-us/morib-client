import MinusBtn from '@/shared/assets/svgs/minus_btn.svg?react';

import { UrlInfo } from '../../types';
import BoxEachUrlInfo from './BoxEachUrlInfo/BoxEachUrlInfo';

interface BoxUrlListProps {
	urlList: UrlInfo[];
	onDelete: (url: string) => void;
}

const BoxUrlList = ({ urlList, onDelete }: BoxUrlListProps) => {
	return (
		<>
			{urlList.map((urlInfo) => (
				<div key={urlInfo.url} className="flex h-[4.6rem] items-center border-b-[0.1rem] border-gray-bg-04">
					<BoxEachUrlInfo urlInfo={urlInfo}>
						<div className="pr-[2.05rem]">
							<button type="button" onClick={() => onDelete(urlInfo.url)}>
								<MinusBtn className="fill-gray-bg-07 hover:fill-error-01 active:fill-error-03" />
							</button>
						</div>
					</BoxEachUrlInfo>
				</div>
			))}
		</>
	);
};

export default BoxUrlList;
