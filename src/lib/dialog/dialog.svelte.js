export function createDialog() {
  let open = $state(false)
  function toggle() {
    open = !open
  }

  return {
    get open() { return open },
    toggle
  }
}