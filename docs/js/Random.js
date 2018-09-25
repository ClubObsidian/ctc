/*
 * Copyright (c) 1995, 2013, Oracle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Oracle designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Oracle in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Oracle, 500 Oracle Parkway, Redwood Shores, CA 94065 USA
 * or visit www.oracle.com if you need additional information or have any
 * questions.
 */
 
//Modified version of java.util.Random ported to javascript uses BigInteger library
//https://github.com/peterolson/BigInteger.js


const mask = bigInt(281474976710655);
const multiplier = bigInt(25214903917);
const addend = 11;

var seed = NaN;

function initialScramble(seed) 
{
	return (bigInt(seed).xor(multiplier)).and(mask);
}

function setSeed(s)
{
	seed = initialScramble(s);
}
	
function next(bits)
{
	seed = bigInt((seed * 0x5DEECE66D + 0xB)).mod(Math.pow(2,48));
	return (bigInt(seed).shiftRight(48 - bits));
}
			
function nextInt(bound) 
{
	var r = next(31);
	console.log("next 31: " + r);
	var m = bound;
	if ((bound & m) == 0)  // i.e., bound is a power of 2
		r = ((bound * r) >> 31);
	else
	{
		for(u = r; u - (r = u % bound) + m < 0; u = next(31));
	}
	return r;
}