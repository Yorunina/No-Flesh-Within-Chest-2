# Tetra effect organ listener

## Lifecycle contract

- Register effect strategies during server script loading with `RegistryTetraOrganEffectStrategy(new TetraOrganEffectModel('effect_id').addStrategy('event_id', handler, priority))`.
- During chest cavity take-on, inspect the modular item's actual `getEffects(stack)` result and add listeners only for registered effects. During take-off, inspect the same result and remove those listeners.
- During event execution, `OrganEventModel` uses `getListenerMap(eventId)` as the gate, merges ordinary organ strategies with effect strategies, and dispatches in descending priority order. Effect handlers receive `customData, event, modularItem, effect`.
- This mechanism does not provide effect caching, active skills, score modifiers, test effects, full slot scans, or other architectural extensions.