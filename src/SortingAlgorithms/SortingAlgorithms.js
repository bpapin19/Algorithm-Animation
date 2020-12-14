/* MERGESORT */
export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}
  
function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

/* QUICKSORT */
export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  doQuick(array, 0, array.length - 1, animations);
  return animations;
}

function doQuick(array, low, high, animations) {
  if (high <= low) return;
  //partition array
  let j = partition(array, low, high, animations);
  // sort low
  doQuick(array, low, j-1, animations);
  //sort high
  doQuick(array, j+1, high, animations);
}

function partition(array, low, high, animations) {
  let i = low, j = high+1;
  let pElement = array[low];
  // Set color of partitioning element to black
  animations.push(["partition1", low]);
  while (true) {
    while (array[++i] < pElement) {
      if (i === high) break;
    }
    while (pElement < array[--j]) {
      if (j === low) break;
    }
    if (i >= j) break;
    exch(array, i, j, animations);
  }
  exch(array, low, j, animations);
  animations.push(["partition2", low]);
  return j;
}

function exch(array, i, j, animations) {
  let temp = array[i];
  // Set elements being compared to Red
  animations.push(["comparison1", i, j]);
  // Swap sizes of both indexes
  animations.push(["swap", i, array[j]]);
  animations.push(["swap", j, temp]);
  let swap = array[i];
  array[i] = array[j];
  array[j] = swap;
  // Change elements being compared back to green
  animations.push(["comparison2", i, j]);
}

/* SELCTION SORT */
export function getSelectionSortAnimations(array) {
  const animations = [];
  let N = array.length;
  for (let i = 0; i < N; i++) {
    let min = i;
    for (let j = i+1; j < N; j++) {
      if (array[j] < array[min]) min = j;
    }
    exch(array, i, min, animations);
  }
  return animations;
}

/* INSERTION SORT */
export function getInsertionSortAnimations(array) {
  const animations = [];
  let N = array.length;
  for (let i = 1; i < N; i++) {
    for (let j = i; j > 0 && (array[j] < array[j-1]); j--) {
      exch(array, j, j-1, animations);
    }
  }
  return animations;
}


