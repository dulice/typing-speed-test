import React, { useEffect, useState } from 'react'
import randomWords from 'random-words';

const Text = () => {
    let time = 60;
    const [countDown, setCounDown] = useState(time);
    const [mistake, setMistake] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [wordCount, setWordCount] = useState(0);
    const [charIndex, setCharIndex] = useState(-1);
    const [word, setWord] = useState('');
    const [paragraph, setParagraph] = useState([]);
    const [start, setStart] = useState(false);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        setParagraph(randomWords(200));
        // console.log(paragraph);
    },[]);

    const handleKeyPress = (e) => {
        if(e.keyCode === 32) {
            const doesMatch = paragraph[wordCount] === word.trim();
            if(doesMatch) {
                setCorrect(correct + 1);
            } else {
                setMistake( mistake + 1);
            }
            setWord("");
            setWordCount( wordCount + 1);
            setCharIndex(-1);
        } else if (e.keyCode === 8) {
            setCharIndex(charIndex - 1);
            console.log(charIndex);
        } else {
            setCharIndex(charIndex + 1);
            console.log(charIndex);

        }
    }

    const getCharClass = (wordId, charId, char) => {
        if(wordId === wordCount && charId === charIndex && char) {
            // console.log(char, word.trim()[charId]);
            if(char === word.trim()[charId]) {
                return 'bg-success text-white'
            } else {
                return 'bg-danger text-white'
            }
        } 
        if(wordCount - 1 >= wordId) {
            return `${wordId} text-black-50`
        }
    };

    const handleStart = () => {
        setStart(true);
        let interval = setInterval(() => {
            setCounDown((prev) => {
                if(prev === 1) {
                    setModal(true);
                    clearInterval(interval);
                }
                return prev - 1
            })
        }, 1000);;       
    };

    const handleRestart = () => {
        setModal(false);
        setCounDown(60);
        setCorrect(0);
        setMistake(0);
        setCharIndex(-1);
        setWordCount(0)
        setStart(false);
    }

  return (
    <div className='my-5'>
        <div className="row">
            <div className="col-3 text-center">
                <h3>{countDown}</h3>
                <p>Second</p>
            </div>
            <div className="col-3 text-center">
                <h3>{mistake}</h3>
                <p>Mistake</p>
            </div>
            <div className="col-3 text-center">
                <h3>{correct}</h3>
                <p>Correct</p>
            </div>
            <div className="col-3 text-center">
                {mistake === 0 && correct === 0
                ? <h3>0</h3>
                : <h3>{(mistake+correct)}</h3>
                }
                <p>WPM</p>
            </div>
        </div>
        {start
        ? <input 
        disabled={modal}
        value={word}
        onChange={(e) => setWord(e.target.value)}
        onKeyDown={handleKeyPress}
        type="text"
        className='form-control my-3'
        autoFocus />
        : <button className='btn btn-primary d-flex justify-content-center mx-auto my-3' onClick={handleStart}>Start</button>
        }
        
        
        <div>
            {paragraph.map((text,index) => (
                <span className='fs-5' key={index}>
                <span className={getCharClass(index)}>{text.split("").map((char, id) => (
                    <span className={getCharClass(index, id, char)} key={id}>{char}</span>
                ))}</span>
                <span> </span>
                </span>
            ))}
            .
        </div>
        {modal &&
       <div className='position-fixed top-50 start-50 translate-middle bg-white shadow rounded-md'>
           <div className="p-5">
            <h5 className='mb-5'>Your typing speed is {mistake+correct}WPM.</h5>
            <div className="row">
                <div className="col-4 text-center text-danger">
                    <h3>{mistake}</h3>
                    <p>Mistake</p>
                </div>
                <div className="col-4 text-center text-success">
                    <h3>{correct}</h3>
                    <p>Correct</p>
                </div>
                <div className="col-4 text-center">
                    <h3>{((correct * 100)/(correct + mistake)).toFixed(2)}%</h3>
                    <p>Currency</p>
                </div>
            </div>
            <button onClick={handleRestart} className="btn btn-primary">Play Again</button>
            <button onClick={() => window.location.reload()} className="btn btn-primary float-end">Play New</button>
           </div>
       </div>
        }
    </div>
  )
}

export default Text