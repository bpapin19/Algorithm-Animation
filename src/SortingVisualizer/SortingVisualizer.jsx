import React, { Component } from "react";
import {getMergeSortAnimations, getQuickSortAnimations, getSelectionSortAnimations, getInsertionSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js';
import './SortingVisualizer.css';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 100;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

// This is the color of the partitioning element throughout the animations.
const TERTIARY_COLOR = 'black';


export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            ANIMATION_SPEED_MS: 4,
            NUMBER_OF_ARRAY_BARS: 100
        };
    }

    setSpeed(value) {
        this.setState({
          ANIMATION_SPEED_MS: value
        })
      }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i=0; i < this.state.NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 500));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * this.state.ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
                }, i * this.state.ANIMATION_SPEED_MS);
            }
        }
    }

    quickSort() {
        const animations = getQuickSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = animations[i][0] === "comparison1" || animations[i][0] === "comparison2";
            const isPartition = animations[i][0] === "partition1" || animations[i][0] === "partition2";
            const arrayBars = document.getElementsByClassName('array-bar');
            if (isPartition === true) {
                const[partition, barIndex] = animations[i];
                const color = (animations[i][0] === "partition1") ?  TERTIARY_COLOR : PRIMARY_COLOR;
                const partBarStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    partBarStyle.backgroundColor = color;
                }, i * this.state.ANIMATION_SPEED_MS);
            }
            if (isColorChange === true) {
                const [comparison, barOneIndex, barTwoIndex] = animations[i];
                const color = (animations[i][0] === "comparison2") ? PRIMARY_COLOR : SECONDARY_COLOR;
                const barOneStyle = arrayBars[barOneIndex]?arrayBars[barOneIndex].style: {};
                const barTwoStyle = arrayBars[barTwoIndex]?arrayBars[barTwoIndex].style: {};
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * this.state.ANIMATION_SPEED_MS);
            } 
            else { 
                const [swap, barIndex, newHeight] = animations[i];
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * this.state.ANIMATION_SPEED_MS);  
            }        
            } 
        } 

    getAnimations(animations) {
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = animations[i][0] === "comparison1" || animations[i][0] === "comparison2";
            const arrayBars = document.getElementsByClassName('array-bar');
            if (isColorChange === true) {
                const [comparison, barOneIndex, barTwoIndex] = animations[i];
                const color = (animations[i][0] === "comparison2") ? PRIMARY_COLOR : SECONDARY_COLOR;
                const barOneStyle = arrayBars[barOneIndex]?arrayBars[barOneIndex].style: {};
                const barTwoStyle = arrayBars[barTwoIndex]?arrayBars[barTwoIndex].style: {};
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * this.state.ANIMATION_SPEED_MS);
            } 
            else { 
                const [swap, barIndex, newHeight] = animations[i];
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * this.state.ANIMATION_SPEED_MS);  
            }        
        } 
    }

    selectionSort() {
        const animations = getSelectionSortAnimations(this.state.array);
        this.getAnimations(animations);
    }

    insertionSort() {
        const animations = getInsertionSortAnimations(this.state.array);
        this.getAnimations(animations);  
    }

    render() {
    const {array} = this.state;

    return (
        <div>
            <div className="topnav">
            <h1 className="heading">Algorithm Animations</h1>
            <p>Cycle through 4 different types of sorts.</p>
                <Slider
                    min={0}
                    max={10}
                    value={this.state.ANIMATION_SPEED_MS}
                    orientation="horizontal"
                    onChange={(value) => this.setSpeed(value)}
                />
                <div className='value'>Speed: {this.state.ANIMATION_SPEED_MS} ms</div>
                <div className='reset_button'>
                    <button className='button' onClick={() => this.resetArray()}>Generate New Array</button>
                </div>
                <div className='sort_buttons'>
                    <button className='button' onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button className='button' onClick={() => this.quickSort()}>Quick Sort</button>
                    <button className='button' onClick={() => this.selectionSort()}>Selection Sort</button>
                    <button className='button' onClick={() => this.insertionSort()}>Insertion Sort</button>
                </div>
            </div>
            <div class="array-body">
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div className="array-bar" key={idx} 
                            style={{
                                backgroundColor: PRIMARY_COLOR,
                                height: `${value}px`,
                            }}>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}