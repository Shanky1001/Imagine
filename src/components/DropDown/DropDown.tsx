const DropDown = ({ label, data, handleSelect, value }: any) => {
	return (
		<div className="">
			<label
				htmlFor={"image-size"}
				className="block text-sm pb-2 font-medium text-gray-900"
			>
				{label}
			</label>
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
		</div>
	);
};

export default DropDown;
