class Task < ApplicationRecord
    validates :title, presence: true, length: { minimum: 1 }
    acts_as_taggable
end
