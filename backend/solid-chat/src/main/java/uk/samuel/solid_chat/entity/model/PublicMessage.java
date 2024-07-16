package uk.samuel.solid_chat.entity.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;


@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PublicMessage extends BaseClass{

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name="sender_id")
    private User sender;

    @Column(name="content", length = 1000)
    private String content;

    @Column(name="created_at")
    @CreationTimestamp
    private String createdAt;
}
