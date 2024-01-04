import { useSafeContext } from '@sirse-dev/safe-context';
import { render, screen } from '@testing-library/react';

import { createPopupGroup, PopupGroup } from '../src/createPopupGroup';

describe('createPopupGroup', () => {
	it('should return a valid react component', () => {
		const Group = createPopupGroup();

		render(<Group />);
	});

	it('should return a component that provides GroupContext', () => {
		const Group = createPopupGroup();

		const InnerComponent = () => {
			useSafeContext(Group.context);
			return <div>hello</div>;
		};

		render(
			<Group>
				<InnerComponent />
			</Group>,
		);

		screen.getByText('hello');
	});

	it('should return a valid Entry component', () => {
		const Group = createPopupGroup();

		render(
			<Group>
				<Group.Entry />
			</Group>,
		);
	});

	it('should return an Entry component that renders popups', () => {
		const Group = createPopupGroup();

		const PopupComponent = () => {
			return <div>Popup!</div>;
		};

		render(
			<Group.context.Provider value={{ popups: [{ Component: PopupComponent, props: {}, id: 'asdf' }] } as any}>
				<Group.Entry />
			</Group.context.Provider>,
		);

		screen.getByText('Popup!');
	});
});
