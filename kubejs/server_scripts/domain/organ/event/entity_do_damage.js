// priority: 500
const OrganEntityDoDamageEvent = new OrganEventModel('entity_do_damage')
    .setInit(
        /** 
         * @param {OrganEventCustomData} customData
         * @param {Internal.LivingHurtEvent} event
         */
        (customData, event) => {
        }
    )
    .setDefer(
        /**
         * @param {OrganEventCustomData} customData
         * @param {Internal.LivingHurtEvent} event
         */
        (customData, event) => {
        }
    )


    /**
     * 
     * @param {Internal.LivingHurtEvent} event 
     */
function OrganEntityDoDamage(event, customData) {
    OrganEntityDoDamageEvent.run(event.source.actual, customData, [event])
}