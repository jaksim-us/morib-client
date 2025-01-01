import ButtonSettingSaved from '../ButtonSettingSaved/ButtonSettingSaved';

interface WorkSpaceSettingContentProps {
	personalWorkspaces: string[];
	teamWorkspaces: string[];
}

const WorkSpaceSettingContent = ({ personalWorkspaces, teamWorkspaces }: WorkSpaceSettingContentProps) => (
	<>
		<p className="w-[92rem] border-b-[0.1rem] border-gray-bg-05 py-[1.5rem] text-white subhead-bold-22">
			내 워크스페이스
		</p>

		{personalWorkspaces.map((name, index) => (
			<div key={index} className="flex h-[11rem] w-[92rem] items-center gap-[2rem] py-[2rem]">
				<div className="h-[7.5rem] w-[7.5rem] rounded-full bg-gray-bg-07" />
				<div className="flex h-[4.6rem] w-[25rem] items-center rounded-[0.5rem] bg-gray-bg-03 p-[1rem] text-white subhead-med-18">
					{name}
				</div>
			</div>
		))}

		<p className="mt-[4rem] w-[92rem] border-b-[0.1rem] border-gray-bg-05 py-[1.5rem] text-white subhead-bold-22">
			팀 워크스페이스
		</p>

		{teamWorkspaces.map((name, index) => (
			<div key={index} className="flex h-[11rem] w-[92rem] items-center gap-[2rem] py-[2rem]">
				<div className="h-[7.5rem] w-[7.5rem] rounded-full bg-gray-bg-07" />
				<div className="flex h-[4.6rem] w-[25rem] items-center rounded-[0.5rem] bg-gray-bg-03 p-[1rem] text-white subhead-med-18">
					{name}
				</div>
			</div>
		))}

		<div className="flex h-[9.2rem] justify-end pt-[17.6rem]">
			<ButtonSettingSaved />
		</div>
	</>
);

export default WorkSpaceSettingContent;
