import React, { createContext, useEffect, useState, useRef } from 'react';

export function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

export function useHasChanged(val) {
	const prevVal = usePrevious(val);
	return prevVal !== val;
}
