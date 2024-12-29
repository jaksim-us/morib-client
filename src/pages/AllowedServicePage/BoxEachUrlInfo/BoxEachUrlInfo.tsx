import { ReactNode } from 'react';

import { UrlInfo } from '../types';

interface BoxEachUrlInfoProps {
	urlInfo: UrlInfo;
	children: ReactNode;
}

const BoxEachUrlInfo = ({ urlInfo, children }: BoxEachUrlInfoProps) => {
	return (
		<>
			<div className="body-med-16 flex w-[19.4rem] items-center truncate pl-[1rem] text-left text-white">
				<img src={urlInfo.faviconUrl} alt="favicon" className="mr-[0.6rem] h-[2rem] w-[2rem]" />
				<p className="truncate">{urlInfo.siteName}</p>
			</div>
			<div className="body-reg-16 w-[31rem] text-left text-gray-04">
				<p className="truncate">{urlInfo.page}</p>
			</div>
			<div className="body-reg-16 w-[79.6rem] text-left text-gray-04">
				<p className="truncate">{urlInfo.url}</p>
			</div>
			<div> {children} </div>
		</>
	);
};

export default BoxEachUrlInfo;
