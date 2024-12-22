import { useState } from 'react';

import StepField from './StepField/StepField';
import StepService from './StepService/StepService';
import StepStart from './StepStart/StepStart';
import { FIELDS } from './constants';
import { useFunnel } from './hooks/useFunnel';

const OnboardingPage = () => {
	const { Funnel, Step, setStep } = useFunnel();

	const [selectedField, setSelectedField] = useState<string[]>([]);

	const handleSelectField = (field: string) => {
		setSelectedField((prev) =>
			prev.includes(field) ? prev.filter((prevField) => prevField !== field) : [...prev, field],
		);
	};

	return (
		<div className="flex h-screen w-[calc(100vw-7.4rem)] bg-gray-bg-01">
			<Funnel>
				<Step name="start">
					<StepStart setStep={setStep} />
				</Step>
				<Step name="field">
					<StepField
						setStep={setStep}
						onSelectField={handleSelectField}
						selectedField={selectedField}
						FIELDS={FIELDS}
					/>
				</Step>
				<Step name="service">
					<StepService setStep={setStep} FIELDS={FIELDS} />
				</Step>
			</Funnel>
		</div>
	);
};

export default OnboardingPage;
