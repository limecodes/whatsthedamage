import React from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { Transaction } from '@app/types'
import { formatUnixTimestamp } from '@app/utils'

interface TransactionItemProps {
	transaction: Transaction
}

export function TransactionItem({ transaction }: TransactionItemProps) {
	const { id, timestamp, amount, description, balanceAfter } = transaction

	return (
		<TableRow key={id}>
			<TableCell>{formatUnixTimestamp(timestamp)}</TableCell>
			<TableCell>{amount}</TableCell>
			<TableCell>{description}</TableCell>
			<TableCell>{balanceAfter}</TableCell>
			<TableCell>Category</TableCell>
			<TableCell>Action</TableCell>
		</TableRow>
	)
}
