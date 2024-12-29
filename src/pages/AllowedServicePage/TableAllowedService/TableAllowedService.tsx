import { ReactNode } from 'react';

import { UrlInfo } from '../../AllowedServicePage/types';

interface TableAllowedServiceProps {
	children: ReactNode;
	urlList: UrlInfo[];
}

const TableAllowedService = ({ children, urlList }: TableAllowedServiceProps) => {
	const tableNum = 9;

	const showYScroll = urlList.length > tableNum;
	const defaultTableStyle = `h-[46rem] w-full overflow-y overflow-x-hidden rounded-[8px] mt-[1rem]`;

	const optionalScrollStyle = showYScroll ? 'overflow-y-auto' : 'overflow-y-hidden';
	const theadStyle =
		' detail-semibold-14 flex h-[4.6rem] items-center border-b-[0.1rem] border-gray-bg-04 text-gray-04';

	const renderEmptyRows = (count: number) => {
		return Array.from({ length: count }).map((_, index) => (
			<div key={`empty-row-${index}`} className="h-[4.6rem] w-full border-b-[0.1rem] border-gray-bg-04" />
		));
	};
	const emptyRowCount = Math.max(tableNum - urlList.length, 0);

	return (
		<div className={`${defaultTableStyle} ${optionalScrollStyle}`}>
			<div>
				<div className={`${theadStyle}`}>
					<div className={`w-[19.4rem] pl-[1rem] text-left`}>사이트 이름</div>
					<div className={`w-[31rem] text-left`}>페이지</div>
					<div className={`w-[79.6rem] text-left`}>주소</div>
				</div>

				<div>
					{children}
					{renderEmptyRows(emptyRowCount)}
				</div>
			</div>
		</div>
	);
};

export default TableAllowedService;
