import { useState } from 'react';

import { FieldStep, ServiceStep, StartStep } from './components';
import { FIELDS } from './constants';
import { useFunnel } from './hooks/useFunnel';

const OnboardingPage = () => {
	const { Funnel, Step, setStep } = useFunnel();

	const [activeTab, setActiveTab] = useState('비즈니스');
	const [selectedField, setSelectedField] = useState<string[]>([]);

	const handleSelectField = (field: string) => {
		setSelectedField((prev) =>
			prev.includes(field) ? prev.filter((prevField) => prevField !== field) : [...prev, field],
		);
	};

	const handleChangeActiveTab = (tab: string) => {
		setActiveTab(tab);
	};

	return (
		<div className="flex h-screen w-[calc(100vw-7.4rem)] bg-gray-bg-01">
			<Funnel>
				<Step name="start">
					<StartStep setStep={setStep} />
				</Step>
				<Step name="field">
					<FieldStep
						setStep={setStep}
						onSelectField={handleSelectField}
						selectedField={selectedField}
						FIELDS={FIELDS}
					/>
				</Step>
				<Step name="service">
					<ServiceStep
						activeTab={activeTab}
						onChangeActiveTab={handleChangeActiveTab}
						setStep={setStep}
						FIELDS={FIELDS}
					/>
				</Step>
			</Funnel>
		</div>
	);
};

export default OnboardingPage;
