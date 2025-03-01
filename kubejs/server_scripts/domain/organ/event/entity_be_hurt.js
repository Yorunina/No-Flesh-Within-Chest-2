// priority: 500
const OrganEntityBeHurtEvent = new OrganEventModel('entity_be_hurt')
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
function OrganEntityBeHurt(event, customData) {
    OrganEntityBeHurtEvent.run(event.source.actual, customData, [event])
}