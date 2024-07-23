import * as fabric from 'fabric';

const shape = [
	{ name: 'Rectangle', id: 'Rect' },
	{ name: 'Circle', id: 'Circle' },
	{ name: 'Triangle', id: 'Triangle' },
	{ name: 'Ellipse', id: 'Ellipse' },
];

export const Sidebar = ({ canvas }) => {
	function addShape(id) {
		const rect = new fabric[id]({
			left: 100,
			top: 100,
			fill: 'red',
			width: 50,
			height: 50,
			stroke: 'blue',
			strokeWidth: 2,
		});
		canvas?.add(rect);
		canvas?.requestRenderAll();
	}

	return (
		<>
			{shape.map((shape) => (
				<button
                    key={shape.id} className=''
					onClick={() => addShape(shape.id)}>
					{shape.name}
				</button>
			))}
		</>
	);
};
