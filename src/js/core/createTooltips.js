import getIndividualOptions from './getIndividualOptions'
import createPopperElement  from './createPopperElement'
import createTrigger from './createTrigger'
import getEventListeners from './getEventListeners'
import evaluateOptions from './evaluateOptions'

import getInnerElements from '../utils/getInnerElements'
import removeTitle from '../utils/removeTitle'
import addMutationObserver from '../utils/addMutationObserver'

import { defaults, browser } from './globals'

import Tippy from './Tippy'

let idCounter = 1

/**
* Creates tooltips for each reference element
* @param {Element[]} els
* @param {Object} config
* @return {Tippy[]} Array of Tippy instances
*/
export default function createTooltips(els, config) {
  return els.reduce((acc, reference) => {
    const id = idCounter
    
    const options = evaluateOptions(reference,
      config.performance
        ? config
        : getIndividualOptions(reference, config)
    )

    const {
      html,
      trigger,
      touchHold,
      dynamicTitle
    } = options

    const title = reference.getAttribute('title')
    if (!title && !html) return acc

    reference.setAttribute('data-tippy', '')
    reference.setAttribute('aria-describedby', `tippy-tooltip-${id}`)

    removeTitle(reference)
    
    const popper = createPopperElement(id, title, options)
    
    const tippy = new Tippy({
      id,
      reference,
      popper,
      options,
      _mutationObservers: []
    })

    const handlers = getEventListeners(tippy, options)
    let listeners = []

    trigger.trim().split(' ').forEach(event =>
        listeners = listeners.concat(
          createTrigger(event, reference, handlers, touchHold)
        )
    )
  
    tippy.listeners = listeners

    // Update tooltip content whenever the title attribute on the reference changes
    if (dynamicTitle) {
      addMutationObserver({
        tippy,
        target: reference,
        callback() {
          const { content } = getInnerElements(popper)
          const title = reference.getAttribute('title')
          if (title) {
            content.innerHTML = title
            removeTitle(reference)
          }
        },
        options: {
          attributes: true
        }
      })
    }
    
    // Shortcuts
    reference._tippy = tippy
    popper._reference = reference

    acc.push(tippy)

    idCounter++

    return acc
  }, [])
}
