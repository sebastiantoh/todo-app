class Task < ApplicationRecord
    # Task must contain a title (with max of 100 char), and description
    validates :title, presence: true, length: { minimum: 1, maximum: 100 }
    validates :description, presence: true, length: { minimum: 1 }

    # Alias for acts_as_taggable_on :tags
    acts_as_taggable
end
