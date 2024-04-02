/*
Situation:
  You have been hired by a company making electric garage doors. 
  Accidents with the present product line have resulted in numerous damaged cars, 
  broken limbs and several killed pets. 
  Your mission is to write a safer version of their controller software.

Specification:
  We always start with a closed door. 
  The remote control has exactly one button, with the following behaviour.
  If the door is closed, a push starts opening the door, and vice-versa.
  It takes 5 seconds for the door to open or close completely.
  While the door is moving, one push pauses movement, another push resumes movement in the same direction.

In order to make the door safer, it has been equipped with resistance-based obstacle detection. 
When the door detects an obstacle, it must immediately reverse the direction of movement.

Input:
  A string where each character represents one second, with the following possible values.
  '.' No event
  'P' Button has been pressed
  'O' Obstacle has been detected (supersedes P)

As an example, '..P....' means that nothing happens for two seconds, 
then the button is pressed, then no further events.

Output:
  A string where each character represents one second and 
  indicates the position of the door (0 if fully closed and 5 fully open). 
  The door starts moving immediately, hence its position changes at the same second as the event.

Example:
  ..P...O..... as input should yield 001234321000 as output
*/


// Solution

function door(events) {
  const OPENED = 0;
  const CLOSED = 1;
  const OPENING = 2;
  const CLOSING = 3;
  const PAUSED_OPENING = 4;
  const PAUSED_CLOSING = 5;

  let state = 1;
  let pos = 0;
  let res = '';

  for (let event of events) {
    switch (state) {
      case OPENED: 
        if (event === 'P') state = CLOSING;
        break;

      case CLOSED:
        if (event === 'P') state = OPENING;
        break;

      case OPENING:
        if (event === 'P') state = PAUSED_OPENING;
        if (event === 'O') state = CLOSING;
        if (pos === 5) state = OPENED;
        break;
        
      case CLOSING: 
        if (event === 'P') state = PAUSED_CLOSING;
        if (event === 'O') state = OPENING;
        if (pos === 0) state = CLOSED;
        break;

      case PAUSED_OPENING: 
        if (event === 'P') state = OPENING;
        break;

      case PAUSED_CLOSING:
        if (event === 'P') state = CLOSING;
        break;
    }

    if (state === OPENING)
      pos += 1;
    if (state === CLOSING)
      pos -= 1;
    res = res + pos;
  }
  
  return res;
}

// or

function door(events) {
  let dir = 0, paused = true, prev = 0
  return [...events].map(x => {
    if (x == '.') {
      if ((dir > 0 && prev == 5) || (dir < 0 && prev == 0)) paused = true
      if (paused) return prev
      return prev += dir
    }
    if (x == 'P') {
      if (paused) {
        if (prev == 5) dir = -1
        else if (prev == 0) dir = 1
        paused = false
        return prev += dir
      }
      paused = true
      return prev
    }
    // x == 'O'
    dir = -dir
    return prev += dir
  }).join``
}