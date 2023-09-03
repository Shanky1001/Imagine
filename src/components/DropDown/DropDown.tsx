
const DropDown = ({ data, handleSelect, value }:any) => {
	return (
		<select
			value={value}
			onChange={handleSelect}
			placeholder={"select image size"}
			className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-black block bg-white border-gray-300 rounded-md"
		>
			{data.map((optionItem: any) => (
				<option
					id={optionItem.id}
					value={optionItem.label}
					key={optionItem.id}
				>
					{optionItem.label}
				</option>
			))}
		</select>
	);
};

export default DropDown;
