import { FieldType } from '@/shared/types/fileds';

// LINK: https://www.notion.so/11a97d212fa28029992bdc1bef53c766?pvs=4
export const SUGGESTED_STIES: Record<FieldType, { title: string; url: string }[]> = {
	비즈니스: [
		{ title: 'Google Trends', url: 'https://trends.google.com/trends/?geo=US' },
		{ title: 'Trello', url: 'https://trello.com/en' },
		{ title: 'Salesforce', url: 'https://www.salesforce.com/kr/?ir=1' },
		{ title: 'Slack', url: 'https://slack.com/intl/ko-kr/' },
		{ title: 'Dropbox', url: 'https://www.dropbox.com/business' },
	],
	디자인: [
		{
			title: '피그마',
			url: 'https://www.figma.com/',
		},
		{
			title: '언스플레쉬',
			url: 'https://unsplash.com/ko',
		},
		{
			title: '프리픽',
			url: 'https://www.freepik.com/',
		},
		{
			title: '핀터레스트',
			url: 'https://kr.pinterest.com/',
		},
		{
			title: '비핸스',
			url: 'https://www.behance.net/',
		},
		{
			title: '노트폴리오',
			url: 'https://notefolio.net/',
		},
		{
			title: '드리블',
			url: 'https://dribbble.com/',
		},
	],
	마케팅: [
		{
			title: '뉴닉',
			url: 'https://newneek.co/',
		},
		{
			title: '캐릿',
			url: 'https://www.careet.net/',
		},
		{
			title: 'DMC리포트',
			url: 'https://www.dmcreport.co.kr/',
		},
		{
			title: '메조 미디어',
			url: 'https://www.mezzomedia.co.kr/',
		},
		{
			title: '나스 미디어',
			url: 'https://www.nasmedia.co.kr/',
		},
	],

	기획: [
		{
			title: '디스콰이엇',
			url: 'https://disquiet.io/',
		},
		{
			title: '브런치',
			url: 'https://brunch.co.kr/',
		},
		{
			title: '노션',
			url: 'https://www.notion.so/',
		},
		{
			title: 'Product Hunt',
			url: 'https://www.producthunt.com/',
		},
		{
			title: 'Figma',
			url: 'https://www.figma.com/ko-kr/',
		},
	],
	개발: [
		{
			title: '챗지피티',
			url: 'https://chatgpt.com/',
		},
		{
			title: '백준',
			url: 'https://www.acmicpc.net/',
		},
		{
			title: 'GitHub',
			url: 'https://github.com/',
		},
		{
			title: 'Slack',
			url: 'https://slack.com/intl/ko-kr/',
		},
		{
			title: 'Stack Overflow',
			url: 'https://stackoverflow.com/',
		},
	],

	공부: [
		{
			title: '노션',
			url: 'https://www.notion.so/',
		},
		{
			title: '카피킬러라이트',
			url: 'https://www.copykiller.com/',
		},
		{
			title: 'RISS',
			url: 'https://www.riss.kr/',
		},
		{
			title: 'Google Drive',
			url: 'https://drive.google.com/',
		},
		{
			title: 'Google Workspace',
			url: 'https://meet.google.com/',
		},
	],
	기타: [
		{
			title: '네이버 파파고',
			url: 'https://papago.naver.com/',
		},
		{
			title: '챗지피티',
			url: 'https://chatgpt.com/',
		},
		{
			title: 'iLovePDF',
			url: 'https://www.ilovepdf.com/ko',
		},
		{
			title: 'Hancomdocs',
			url: 'https://www.hancomdocs.com/home',
		},
		{
			title: 'Gmail',
			url: 'https://mail.google.com/mail/',
		},
	],
};
