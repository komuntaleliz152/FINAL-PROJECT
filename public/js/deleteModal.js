// Custom Delete Modal
class DeleteModal {
  constructor() {
    this.createModal();
    this.currentForm = null;
  }

  createModal() {
    // Create modal HTML
    const modalHTML = `
      <div id="deleteModalOverlay" class="delete-modal-overlay">
        <div class="delete-modal">
          <div class="delete-modal-header">
            <div class="delete-modal-icon">⚠️</div>
            <h3 class="delete-modal-title">Confirm Deletion</h3>
          </div>
          <div class="delete-modal-body">
            <p class="delete-modal-message" id="deleteModalMessage"></p>
            <div class="delete-modal-item" id="deleteModalItem"></div>
          </div>
          <div class="delete-modal-footer">
            <button class="delete-modal-btn delete-modal-btn-cancel" id="deleteModalCancel">
              Cancel
            </button>
            <button class="delete-modal-btn delete-modal-btn-delete" id="deleteModalConfirm">
              Delete
            </button>
          </div>
        </div>
      </div>
    `;

    // Add to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Get elements
    this.overlay = document.getElementById('deleteModalOverlay');
    this.messageEl = document.getElementById('deleteModalMessage');
    this.itemEl = document.getElementById('deleteModalItem');
    this.cancelBtn = document.getElementById('deleteModalCancel');
    this.confirmBtn = document.getElementById('deleteModalConfirm');

    // Event listeners
    this.cancelBtn.addEventListener('click', () => this.hide());
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.hide();
    });
    this.confirmBtn.addEventListener('click', () => this.confirm());

    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
        this.hide();
      }
    });
  }

  show(message, itemName, form) {
    this.currentForm = form;
    this.messageEl.textContent = message;
    this.itemEl.innerHTML = `<strong>Item:</strong> ${itemName}`;
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  hide() {
    this.overlay.classList.remove('active');
    document.body.style.overflow = '';
    this.currentForm = null;
  }

  confirm() {
    if (this.currentForm) {
      this.currentForm.submit();
    }
    this.hide();
  }
}

// Initialize modal when DOM is ready
let deleteModal;
document.addEventListener('DOMContentLoaded', () => {
  deleteModal = new DeleteModal();
});

// Helper function to show delete confirmation
function showDeleteConfirmation(message, itemName, form) {
  if (deleteModal) {
    deleteModal.show(message, itemName, form);
  }
  return false; // Prevent form submission
}
