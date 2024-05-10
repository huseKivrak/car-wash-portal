'use client';
import { useEffect, useState } from 'react';

import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	SortingState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	FilterFn,
	Column,
	RowData,
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { Pagination } from './pagination';
import { Input } from './input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './select';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>('');

	// const globalFilterFn: FilterFn<any> = (
	// 	row,
	// 	columnId,
	// 	filterValue: string
	// ) => {
	// 	console.log('ROW COLUMN FILTERS:', row.columnFilters);
	// 	console.log('ROW COLUMN FILTERS @:', row.columnFiltersMeta);
	// 	const search = filterValue.toLowerCase();
	// 	let value = row.getValue(columnId) as string;
	// 	if (typeof value === 'number') value = String(value);

	// 	return value?.toLowerCase().includes(search);
	// };

	const table = useReactTable({
		data,
		columns,
		filterFns: {},
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onGlobalFilterChange: setGlobalFilter,

		state: {
			sorting,
			columnFilters,
		},
	});
	return (
		<div>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}

										{header.column.getCanFilter() ? (
											<div>
												<Filter column={header.column} />
											</div>
										) : null}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className='h-24 text-center'>
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<Pagination table={table} />
		</div>
	);
}

function Filter({ column }: { column: Column<any, unknown> }) {
	const columnFilterValue = column.getFilterValue();
	const meta = column.columnDef.meta;
	const isSubscriptionStatus = meta === 'status';
	return isSubscriptionStatus ? (
		<Select
			onValueChange={(val) => column.setFilterValue(val)}
			value={columnFilterValue?.toString()}
		>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder='Select status type' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='active'>Active</SelectItem>
				<SelectItem value='transferred'>Transferred</SelectItem>
				<SelectItem value='overdue'>Overdue</SelectItem>
				<SelectItem value='cancelled'> Cancelled</SelectItem>
			</SelectContent>
		</Select>
	) : (
		<DebouncedInput
			type='text'
			value={(columnFilterValue ?? '') as string}
			onChange={(value) => column.setFilterValue(value)}
			placeholder={`Search...`}
			className='w-36 border shadow rounded'
		/>
	);
}

// A typical debounced input react component
function DebouncedInput({
	value: initialValue,
	onChange,
	debounce = 500,
	...props
}: {
	value: string | number;
	onChange: (value: string | number) => void;
	debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value);
		}, debounce);

		return () => clearTimeout(timeout);
	}, [value]);

	return (
		<Input
			{...props}
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	);
}